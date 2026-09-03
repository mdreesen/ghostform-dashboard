import type { Model } from 'mongoose'
import LeadModel from '../../lib/database/models/Lead'

const Lead = LeadModel as Model<any>

/**
 * ============================================================================
 * SPHERE — who's gone quiet, and why to call them
 * ============================================================================
 * THE GAP THIS FILLS:
 * 76% of buyers say they'd use their agent again. Around 12% do. Every CRM
 * sells "sphere nurture" and every one of them does the same thing — hands you
 * a reminder to call.
 *
 * A reminder is not the hard part. Picking up the phone with nothing to say is.
 * "Touch base" calls don't get made because they're uncomfortable, so the
 * reminder gets snoozed and the database goes cold anyway.
 *
 * So this surfaces the REASON alongside the name — the thing you said out loud
 * three months ago about their second kid, or the mother in Whitefish. That's
 * the difference between a task and a conversation.
 * ============================================================================
 */

export interface SphereContact {
  _id: string
  name: string
  email: string
  phone: string
  closedAddress: string
  monthsQuiet: number
  /** Why this one, now. */
  reason: string
  /** The thing you know about them — the opener. */
  opener: string
  /** Home anniversary within the next 30 days, if any. */
  anniversary: string
  overdue: boolean
}

const MONTH = 1000 * 60 * 60 * 24 * 30.44

export async function buildSphereBriefing(
  userId: any,
  limit = 5
): Promise<SphereContact[]> {
  const now = new Date()

  // A past client is a lead that closed. Same record — nothing re-entered at
  // the moment the relationship starts being worth money.
  const clients = await Lead.find(
    { userId, closedAt: { $ne: null } },
    {
      name: 1, email: 1, phone: 1, closedAt: 1, closedAddress: 1,
      sphereNotes: 1, lastTouchAt: 1, touchEveryMonths: 1
    }
  ).lean() as any[]

  const out: SphereContact[] = []

  for (const c of clients) {
    const last = c.lastTouchAt ? new Date(c.lastTouchAt) : new Date(c.closedAt)
    const monthsQuiet = Math.floor((now.getTime() - last.getTime()) / MONTH)
    const cadence = c.touchEveryMonths ?? 4

    // Home anniversary inside the next 30 days — the one date that gives a
    // call a natural reason without inventing one.
    let anniversary = ''
    if (c.closedAt) {
      const closed = new Date(c.closedAt)
      const next = new Date(now.getFullYear(), closed.getMonth(), closed.getDate())
      if (next < now) next.setFullYear(next.getFullYear() + 1)
      const days = Math.round((next.getTime() - now.getTime()) / 86400000)
      if (days <= 30) {
        const years = next.getFullYear() - closed.getFullYear()
        anniversary = years > 0
          ? `${years} year${years === 1 ? '' : 's'} in the house on ${next.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
          : ''
      }
    }

    const overdue = monthsQuiet >= cadence
    if (!overdue && !anniversary) continue

    // The most recent thing you said about them. Newest first, because
    // "second kid on the way" beats "liked the kitchen" from two years ago.
    const notes = [...(c.sphereNotes ?? [])].sort(
      (a, b) => new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime()
    )
    const opener = notes[0]?.text ?? ''

    out.push({
      _id: String(c._id),
      name: c.name || c.email,
      email: c.email || '',
      phone: c.phone || '',
      closedAddress: c.closedAddress || '',
      monthsQuiet,
      overdue,
      anniversary,
      opener,
      reason: anniversary
        ? anniversary
        : `${monthsQuiet} months since you last spoke`
    })
  }

  // Anniversaries first — they expire. Then the longest silence.
  out.sort((a, b) => {
    if (Boolean(a.anniversary) !== Boolean(b.anniversary)) return a.anniversary ? -1 : 1
    return b.monthsQuiet - a.monthsQuiet
  })

  // Deliberately capped. A list of forty people is a list nobody works — the
  // whole failure mode here is overwhelm, so show a handful that get done.
  return out.slice(0, limit)
}
