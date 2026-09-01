import { z } from 'zod'
import type { Model } from 'mongoose'
import DocumentModel from '../../../lib/database/models/Document'
import HomeModel from '../../../lib/database/models/Home'
import { useOpenAi } from '~/utils/ai/openAi/useOpenAi'
import loggedInUser from '~/utils/loggedInUser'

const Doc = DocumentModel as Model<any>
const Home = HomeModel as Model<any>

const bodySchema = z.object({
  question: z.string().min(3).max(500),
  homeId: z.string().optional(),
  leadId: z.string().optional()
})

/**
 * POST /api/documents/ask
 *
 * Answers a question from what we've ALREADY extracted — the summaries and
 * confirmed deadlines — not by re-reading the source files.
 *
 * That's deliberate:
 *   - The extracted data is what the realtor has already checked and confirmed,
 *     so the answer is grounded in something they've agreed is correct.
 *   - It's fast and cheap. Re-sending several 20MB contracts per question
 *     would be slow and expensive.
 *   - Contracts contain client financials. Not re-uploading them on every
 *     question is a smaller surface.
 *
 * The trade is that it can't answer something never extracted — so it says so
 * rather than guessing, and points at the document.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { question, homeId, leadId } = await readValidatedBody(event, bodySchema.parse)
  if (!process.env.OPENAI_API_KEY) {
    throw createError({ statusCode: 503, message: 'Answering is not configured yet.' })
  }

  const filter: Record<string, any> = { userId: user._id }
  if (homeId) filter.homeId = homeId
  if (leadId) filter.leadId = leadId

  const docs = await Doc.find(filter, {
    filename: 1, docType: 1, summary: 1, deadlines: 1, homeId: 1
  }).limit(40).lean() as any[]

  if (!docs.length) {
    return { answer: 'There are no documents here yet, so there is nothing for me to check.', sources: [] }
  }

  // Give the model the property address, since questions are phrased that way.
  const homeIds = [...new Set(docs.map((d) => d.homeId).filter(Boolean).map(String))]
  const homes = homeIds.length
    ? await Home.find({ _id: { $in: homeIds }, userId: user._id }, { name: 1, address: 1 }).lean() as any[]
    : []
  const homeById = new Map(homes.map((h) => [String(h._id), h]))

  const context = docs.map((d) => {
    const home = d.homeId ? homeById.get(String(d.homeId)) : null
    const dates = (d.deadlines ?? [])
      .filter((x: any) => !x.dismissed)
      .map((x: any) => {
        const when = new Date(x.date).toISOString().slice(0, 10)
        const state = x.completed ? 'DONE' : x.confirmed ? 'confirmed' : 'unconfirmed'
        return `  - ${x.label}: ${when} (${state})`
      }).join('\n')

    return [
      `DOCUMENT: ${d.docType || 'Unknown type'} — ${d.filename}`,
      home ? `PROPERTY: ${home.address || home.name}` : '',
      d.summary ? `SUMMARY: ${d.summary}` : '',
      dates ? `DATES:\n${dates}` : '  (no dates recorded)'
    ].filter(Boolean).join('\n')
  }).join('\n\n')

  const prompt = [
    `A real estate agent is asking about their own documents. Answer from the`,
    `information below and nothing else.`,
    ``,
    `Today: ${new Date().toISOString().slice(0, 10)}`,
    ``,
    context,
    ``,
    `QUESTION: ${question}`,
    ``,
    `RULES`,
    `- Answer in one or two sentences. They are often driving or between showings.`,
    `- Give the actual date AND how far away it is ("March 14, that's Tuesday").`,
    `- If the answer isn't in the information above, say so plainly and name`,
    `  which document they should open. NEVER guess a date — acting on a wrong`,
    `  one costs them the deal.`,
    `- If a date is marked unconfirmed, say that it still needs checking.`,
    `- Do not give legal advice or interpret what a clause means.`
  ].join('\n')

  try {
    // Same helper as the rest of the app's text generation.
    const answer = await useOpenAi(
      [{ role: 'user', content: prompt }],
      { maxTokens: 500, temperature: 0.3 }
    )
    if (!answer) throw new Error('empty response')

    return {
      answer,
      sources: docs.map((d) => ({ id: String(d._id), filename: d.filename, docType: d.docType }))
    }
  } catch (err: any) {
    console.error('[ask] failed:', err?.data?.error?.message || err?.message)
    throw createError({ statusCode: 502, message: 'Could not answer that just now. Please try again.' })
  }
})
