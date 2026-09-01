import type { Model } from 'mongoose'
import DocumentModel from '../../lib/database/models/Document'
import HomeModel from '../../lib/database/models/Home'
import LeadModel from '../../lib/database/models/Lead'

const Doc = DocumentModel as Model<any>
const Home = HomeModel as Model<any>
const Lead = LeadModel as Model<any>

/**
 * Deadlines due for today's briefing.
 *
 * ONLY CONFIRMED ONES. An unconfirmed extraction is a guess, and putting a
 * guess in the morning briefing next to real work would either be ignored or —
 * worse — trusted. Unconfirmed dates stay on the document where they can be
 * checked against their source sentence.
 */
export interface BriefingDeadline {
  documentId: string
  deadlineId: string
  filename: string
  /** What this is FOR. A realtor thinks in addresses, not filenames. */
  propertyName: string
  propertyAddress: string
  leadName: string
  /** "Purchase agreement" beats "purchase-agreement-TEST.pdf". */
  docType: string
  label: string
  date: string
  priority: 'high' | 'medium' | 'low'
  daysUntil: number
  homeId?: string
  leadId?: string
}

export async function buildDeadlineBriefing(
  userId: any,
  horizonDays = 14
): Promise<BriefingDeadline[]> {
  const now = new Date()
  const start = new Date(now); start.setHours(0, 0, 0, 0)
  const horizon = new Date(start); horizon.setDate(horizon.getDate() + horizonDays)

  const docs = await Doc.find(
    { userId, 'deadlines.confirmed': true },
    { filename: 1, deadlines: 1, homeId: 1, leadId: 1, docType: 1 }
  ).lean() as any[]

  // Resolve properties and leads in two queries rather than one per document.
  const homeIds = [...new Set(docs.map((d) => d.homeId).filter(Boolean).map(String))]
  const leadIds = [...new Set(docs.map((d) => d.leadId).filter(Boolean).map(String))]

  const [homes, leads] = await Promise.all([
    homeIds.length
      ? Home.find({ _id: { $in: homeIds }, userId }, { name: 1, address: 1 }).lean()
      : Promise.resolve([]),
    leadIds.length
      ? Lead.find({ _id: { $in: leadIds }, userId }, { name: 1, email: 1 }).lean()
      : Promise.resolve([])
  ]) as [any[], any[]]

  const homeById = new Map(homes.map((h) => [String(h._id), h]))
  const leadById = new Map(leads.map((l) => [String(l._id), l]))

  const out: BriefingDeadline[] = []

  for (const doc of docs) {
    for (const d of doc.deadlines ?? []) {
      if (!d.confirmed || d.dismissed || d.completed) continue
      const when = new Date(d.date)
      if (Number.isNaN(when.getTime())) continue

      // Overdue always shows, however old — a passed contingency doesn't stop
      // mattering just because the date went by.
      if (when > horizon) continue

      const home = doc.homeId ? homeById.get(String(doc.homeId)) : null
      const lead = doc.leadId ? leadById.get(String(doc.leadId)) : null

      out.push({
        documentId: String(doc._id),
        deadlineId: String(d._id),
        filename: doc.filename,
        propertyName: home?.name ?? '',
        propertyAddress: home?.address ?? '',
        leadName: lead?.name || lead?.email || '',
        docType: doc.docType ?? '',
        label: d.label,
        date: when.toISOString(),
        priority: d.priority ?? 'medium',
        daysUntil: Math.round((new Date(when).setHours(0, 0, 0, 0) - start.getTime()) / 86400000),
        homeId: doc.homeId ? String(doc.homeId) : undefined,
        leadId: doc.leadId ? String(doc.leadId) : undefined
      })
    }
  }

  // Soonest first; overdue floats to the top naturally with negative days.
  return out.sort((a, b) => a.daysUntil - b.daysUntil)
}

/** One line for the briefing headline, or '' when there's nothing pressing. */
export function deadlineHeadline(items: BriefingDeadline[]): string {
  const overdue = items.filter((i) => i.daysUntil < 0).length
  const today = items.filter((i) => i.daysUntil === 0).length

  if (overdue) return `${overdue} deadline${overdue === 1 ? '' : 's'} overdue`
  if (today) return `${today} deadline${today === 1 ? '' : 's'} today`

  const soon = items.filter((i) => i.daysUntil <= 3).length
  if (soon) return `${soon} deadline${soon === 1 ? '' : 's'} in the next few days`
  return ''
}
