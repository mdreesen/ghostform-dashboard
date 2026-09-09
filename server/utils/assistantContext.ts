import type { Model } from 'mongoose'
import LeadModel from '../../lib/database/models/Lead'
import DocumentModel from '../../lib/database/models/Document'
import HomeModel from '../../lib/database/models/Home'

const Lead = LeadModel as Model<any>
const Doc = DocumentModel as Model<any>
const Home = HomeModel as Model<any>

/**
 * ============================================================================
 * ASSISTANT CONTEXT
 * ============================================================================
 * The realtor's own data, assembled for a single question.
 *
 * WHY THIS FILE IS THE WHOLE FEATURE:
 * An AI chat with no system of record behind it is ChatGPT with a real-estate
 * prompt — and a realtor already has that for free. The value is entirely in
 * knowing THIS agent's people, THIS contract's dates, and what they said about
 * the Kellers three months ago.
 *
 * WHAT IS DELIBERATELY EXCLUDED:
 * Only CONFIRMED deadlines. An unconfirmed extraction is a guess, and a guess
 * repeated confidently in a chat answer is worse than no answer — the same
 * rule the daily briefing follows.
 *
 * Everything is scoped by userId. There is no path here that reads another
 * realtor's data.
 * ============================================================================
 */

const MONTH = 1000 * 60 * 60 * 24 * 30.44

function days(from: Date | string): number {
  const t = new Date(from).getTime()
  const start = new Date(); start.setHours(0, 0, 0, 0)
  return Math.round((new Date(t).setHours(0, 0, 0, 0) - start.getTime()) / 86400000)
}

export async function buildAssistantContext(userId: any): Promise<string> {
  const now = new Date()

  const [leads, docs, homes] = await Promise.all([
    Lead.find({ userId }, {
      name: 1, email: 1, phone: 1, status: 1, stage: 1, qualification: 1,
      closedAt: 1, closedAddress: 1, sphereNotes: 1, lastTouchAt: 1,
      address: 1, budget: 1, intent: 1, updatedAt: 1
    }).sort({ updatedAt: -1 }).limit(150).lean() as any,
    Doc.find({ userId, status: 'ready' }, { filename: 1, docType: 1, summary: 1, deadlines: 1, homeId: 1, leadId: 1 })
      .limit(40).lean() as any,
    Home.find({ userId }, { name: 1, address: 1, status: 1, price: 1 }).limit(60).lean() as any
  ])

  const homeById = new Map((homes as any[]).map((h) => [String(h._id), h]))
  const parts: string[] = []

  // ---- People ----
  const active = (leads as any[]).filter((l) => !l.closedAt)
  if (active.length) {
    parts.push('PEOPLE THEY ARE WORKING WITH:')
    for (const l of active.slice(0, 60)) {
      const bits = [
        l.name || l.email,
        l.intent && `looking to ${l.intent}`,
        l.budget && `budget ${l.budget}`,
        l.stage && `stage: ${l.stage}`,
        l.qualification?.score != null && `readiness ${l.qualification.score}/100`,
        l.address
      ].filter(Boolean)
      parts.push(`  · ${bits.join(' · ')}`)
    }
  }

  // ---- Past clients, with the openers ----
  const past = (leads as any[]).filter((l) => l.closedAt)
  if (past.length) {
    parts.push('', 'PAST CLIENTS:')
    for (const l of past.slice(0, 40)) {
      const quiet = Math.floor((now.getTime() - new Date(l.lastTouchAt || l.closedAt).getTime()) / MONTH)
      const notes = (l.sphereNotes ?? []).map((n: any) => n.text).slice(0, 3)
      parts.push(
        `  · ${l.name || l.email} — closed ${new Date(l.closedAt).toISOString().slice(0, 10)}` +
        `${l.closedAddress ? ` at ${l.closedAddress}` : ''} · ${quiet} months since last contact` +
        (notes.length ? `\n      known about them: ${notes.join('; ')}` : '')
      )
    }
  }

  // ---- Confirmed deadlines only ----
  const dl: string[] = []
  for (const d of docs as any[]) {
    const home = d.homeId ? homeById.get(String(d.homeId)) : null
    for (const x of d.deadlines ?? []) {
      if (!x.confirmed || x.dismissed || x.completed) continue
      const n = days(x.date)
      dl.push(`  · ${x.label} — ${new Date(x.date).toISOString().slice(0, 10)} (${n < 0 ? `${Math.abs(n)} days overdue` : n === 0 ? 'today' : `in ${n} days`})` +
              `${home?.address ? ` · ${home.address}` : ''} · from ${d.docType || d.filename}`)
    }
  }
  if (dl.length) parts.push('', 'CONFIRMED DEADLINES:', ...dl)

  // ---- Properties ----
  if ((homes as any[]).length) {
    parts.push('', 'PROPERTIES:')
    for (const h of homes as any[]) {
      parts.push(`  · ${h.address || h.name}${h.status ? ` · ${h.status}` : ''}${h.price ? ` · ${h.price}` : ''}`)
    }
  }

  // ---- Document summaries ----
  const withSummary = (docs as any[]).filter((d) => d.summary)
  if (withSummary.length) {
    parts.push('', 'DOCUMENTS:')
    for (const d of withSummary.slice(0, 20)) {
      parts.push(`  · ${d.docType || d.filename}: ${String(d.summary).slice(0, 220)}`)
    }
  }

  return parts.join('\n')
}
