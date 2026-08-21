import type { Model } from 'mongoose'
import LeadModelImport from '../../lib/database/models/Lead'

const LeadModel = LeadModelImport as Model<any>

/**
 * ============================================================================
 * DAILY "WHO TO CONTACT" BRIEFING ENGINE
 * ============================================================================
 * Pure logic layer. Given a realtor's userId, it pulls their leads and sorts
 * them into prioritized buckets so the realtor knows exactly who to reach out
 * to today. Designed to work with ZERO external AI dependency (deterministic
 * rules + scoring), with an optional LLM narration layer bolted on separately.
 *
 * The three core buckets:
 *   1. NEW        — leads that have never been contacted (highest urgency;
 *                   speed-to-lead is everything in real estate).
 *   2. OVERDUE    — leads with a reminder that was scheduled for the past but
 *                   somehow still open, OR follow-ups the realtor set that are
 *                   now due.
 *   3. COLD       — leads that were contacted once but have gone quiet for
 *                   longer than the realtor's cold_lead_after_days threshold.
 *
 * Each lead is given a numeric priorityScore so the UI can rank within/across
 * buckets. Higher = more urgent.
 * ============================================================================
 */

export interface BriefingLead {
  _id: string
  name: string
  email: string
  phone: string
  status: string
  bucket: 'new' | 'overdue' | 'cold'
  reason: string
  daysSinceContact: number | null
  lastContactLabel: string
  priorityScore: number
  best_communication_method?: string
}

export interface DailyBriefing {
  generatedAt: string
  totals: {
    total: number
    new: number
    overdue: number
    cold: number
  }
  // Flat, already-ranked list (highest priority first) — easiest for the UI.
  leads: BriefingLead[]
  // A short plain-language headline the UI can show at the top. This is the
  // deterministic fallback; an LLM narration can override it if configured.
  headline: string
}

/**
 * Resolve the most reliable "last time we touched this lead" date.
 * Prefers the explicit lastContactedAt stamp, then falls back to updatedAt,
 * then createdAt, so leads created before contact-tracking existed still work.
 */
function resolveLastContact(lead: any): Date | null {
  if (lead.lastContactedAt) return new Date(lead.lastContactedAt)
  // A lead that has never been contacted has no meaningful "last contact".
  // We return null so the engine treats it as NEW rather than COLD.
  if (lead.contactCount && lead.contactCount > 0) {
    if (lead.updatedAt) return new Date(lead.updatedAt)
    if (lead.createdAt) return new Date(lead.createdAt)
  }
  return null
}

function daysBetween(from: Date, to: Date): number {
  const ms = to.getTime() - from.getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

const HUMAN_DAY = (n: number) =>
  n <= 0 ? 'today' : n === 1 ? '1 day ago' : `${n} days ago`

/**
 * Build the briefing for a single realtor.
 *
 * @param userId  the realtor's Mongo _id
 * @param opts.cold_lead_after_days  silence threshold before a lead is "cold"
 * @param opts.now  injectable clock for testing (defaults to real now)
 */
export async function buildDailyBriefing(
  userId: string,
  opts: { cold_lead_after_days?: number; now?: Date } = {}
): Promise<DailyBriefing> {
  const now = opts.now ?? new Date()
  const coldAfter = opts.cold_lead_after_days ?? 14

  // Pull only fields we need, lean for speed. Statuses that are effectively
  // "done" (closed, archive) are excluded from active follow-up nudges —
  // a closed deal doesn't belong in today's call list.
  const leads = await LeadModel.find({
    userId,
    status: { $nin: ['closed', 'archive'] }
  })
    .select(
      'name email phone status best_communication_method lastContactedAt contactCount reminderStatus reminderScheduledAt createdAt updatedAt'
    )
    .lean()

  const result: BriefingLead[] = []

  for (const lead of leads) {
    const lastContact = resolveLastContact(lead)
    const neverContacted = lastContact === null

    let bucket: BriefingLead['bucket']
    let reason: string
    let priorityScore: number
    const daysSinceContact = lastContact ? daysBetween(lastContact, now) : null

    // ---- Bucket 1: OVERDUE scheduled follow-up ----
    // A realtor explicitly queued a reminder whose time has passed but it's
    // still sitting in 'scheduled'. That's a promise slipping — top priority.
    const hasOverdueReminder =
      lead.reminderStatus === 'scheduled' &&
      lead.reminderScheduledAt &&
      new Date(lead.reminderScheduledAt).getTime() <= now.getTime()

    if (hasOverdueReminder) {
      bucket = 'overdue'
      const overdueDays = daysBetween(new Date(lead.reminderScheduledAt), now)
      reason =
        overdueDays <= 0
          ? 'Follow-up you scheduled is due today'
          : `Follow-up you scheduled is ${overdueDays} day${overdueDays === 1 ? '' : 's'} overdue`
      // Overdue scheduled follow-ups outrank everything.
      priorityScore = 1000 + overdueDays
    }
    // ---- Bucket 2: NEW / never contacted ----
    else if (neverContacted) {
      bucket = 'new'
      const ageDays = lead.createdAt ? daysBetween(new Date(lead.createdAt), now) : 0
      reason =
        ageDays <= 0
          ? 'New lead — reach out today'
          : `New lead, still uncontacted after ${ageDays} day${ageDays === 1 ? '' : 's'}`
      // New leads are urgent; the longer they sit uncontacted the worse it is,
      // but they never outrank an explicitly overdue promise.
      priorityScore = 500 + Math.min(ageDays, 400)
    }
    // ---- Bucket 3: COLD ----
    else if (daysSinceContact !== null && daysSinceContact >= coldAfter) {
      bucket = 'cold'
      reason = `No contact in ${daysSinceContact} days — time to check in`
      // Colder = slightly higher within the cold bucket, capped so it never
      // climbs into new/overdue territory.
      priorityScore = 100 + Math.min(daysSinceContact, 399)
    }
    // ---- Not actionable today ----
    else {
      continue
    }

    result.push({
      _id: String(lead._id),
      name: lead.name || 'Unnamed lead',
      email: lead.email || '',
      phone: lead.phone || '',
      status: lead.status || 'new',
      bucket,
      reason,
      daysSinceContact,
      lastContactLabel:
        daysSinceContact === null
          ? 'Never contacted'
          : `Last contacted ${HUMAN_DAY(daysSinceContact)}`,
      priorityScore,
      best_communication_method: lead.best_communication_method
    })
  }

  // Rank highest priority first.
  result.sort((a, b) => b.priorityScore - a.priorityScore)

  const totals = {
    total: result.length,
    new: result.filter((l) => l.bucket === 'new').length,
    overdue: result.filter((l) => l.bucket === 'overdue').length,
    cold: result.filter((l) => l.bucket === 'cold').length
  }

  return {
    generatedAt: now.toISOString(),
    totals,
    leads: result,
    headline: buildHeadline(totals)
  }
}

/**
 * Deterministic, no-AI headline. Always available, costs nothing, never fails.
 * Reads like a human assistant's one-line summary.
 */
export function buildHeadline(totals: DailyBriefing['totals']): string {
  if (totals.total === 0) {
    return "You're all caught up — no leads need attention today. Nice work."
  }

  const parts: string[] = []
  if (totals.overdue > 0)
    parts.push(`${totals.overdue} overdue follow-up${totals.overdue === 1 ? '' : 's'}`)
  if (totals.new > 0)
    parts.push(`${totals.new} new lead${totals.new === 1 ? '' : 's'} to reach`)
  if (totals.cold > 0)
    parts.push(`${totals.cold} going cold`)

  // Join naturally: "A, B and C"
  let list: string
  if (parts.length === 1) list = parts[0]!
  else if (parts.length === 2) list = `${parts[0]} and ${parts[1]}`
  else list = `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`

  return `You have ${list} today.`
}

export { HUMAN_DAY }
