import type { Model } from 'mongoose'
import DocumentModel from '../../lib/database/models/Document'
import LeadModel from '../../lib/database/models/Lead'
import HomeModel from '../../lib/database/models/Home'

const Doc = DocumentModel as Model<any>
const Lead = LeadModel as Model<any>
const Home = HomeModel as Model<any>

/**
 * ============================================================================
 * "DID THIS CLOSE?"
 * ============================================================================
 * The weak point in the sphere feature was that marking a deal closed is a
 * button you have to REMEMBER to press — the same forgetting the whole product
 * exists to fix. A feature that depends on a new habit doesn't get used.
 *
 * But the trigger already exists in the data. The contract has a closing date,
 * and the app already extracted and confirmed it. When that date passes, the
 * app has everything it needs to ask.
 *
 * So the deadline tracking feeds the sphere: the last deadline of a deal
 * becomes the first moment of a relationship. No new habit, no new screen.
 * ============================================================================
 */

export interface ClosingPrompt {
  leadId: string
  leadName: string
  address: string
  closedOn: string
  documentId: string
}

const CLOSING_WORDS = /closing|settlement|close of escrow|possession/i

export async function buildClosingPrompts(userId: any): Promise<ClosingPrompt[]> {
  const now = new Date()

  // Documents attached to a lead that isn't already closed.
  const docs = await Doc.find(
    { userId, leadId: { $ne: null }, 'deadlines.confirmed': true },
    { leadId: 1, homeId: 1, deadlines: 1 }
  ).lean() as any[]

  if (!docs.length) return []

  const leadIds = [...new Set(docs.map((d) => String(d.leadId)))]
  const leads = await Lead.find(
    // Only leads NOT already marked closed — asking twice is worse than not asking.
    { _id: { $in: leadIds }, userId, closedAt: null },
    { name: 1, email: 1, address: 1 }
  ).lean() as any[]
  const leadById = new Map(leads.map((l) => [String(l._id), l]))
  if (!leadById.size) return []

  const homeIds = [...new Set(docs.map((d) => d.homeId).filter(Boolean).map(String))]
  const homes = homeIds.length
    ? await Home.find({ _id: { $in: homeIds }, userId }, { address: 1 }).lean() as any[]
    : []
  const homeById = new Map(homes.map((h) => [String(h._id), h]))

  const out: ClosingPrompt[] = []
  const seen = new Set<string>()

  for (const doc of docs) {
    const lead = leadById.get(String(doc.leadId))
    if (!lead || seen.has(String(lead._id))) continue

    for (const d of doc.deadlines ?? []) {
      if (!d.confirmed || d.dismissed) continue
      if (!CLOSING_WORDS.test(String(d.label || ''))) continue

      const when = new Date(d.date)
      if (Number.isNaN(when.getTime()) || when > now) continue

      // Give it a couple of days — asking the morning of a closing is noise.
      const daysSince = Math.floor((now.getTime() - when.getTime()) / 86400000)
      if (daysSince < 1) continue

      const home = doc.homeId ? homeById.get(String(doc.homeId)) : null

      out.push({
        leadId: String(lead._id),
        leadName: lead.name || lead.email,
        address: home?.address || lead.address || '',
        closedOn: when.toISOString(),
        documentId: String(doc._id)
      })
      seen.add(String(lead._id))
      break
    }
  }

  return out
}
