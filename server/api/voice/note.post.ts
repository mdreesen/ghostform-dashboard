import { z } from 'zod'
import type { Model } from 'mongoose'
import VoiceNoteModel from '../../../lib/database/models/VoiceNote'
import ReminderModel from '../../../lib/database/models/Reminder'
import DocumentModel from '../../../lib/database/models/Document'
import LeadModel from '../../../lib/database/models/Lead'
import { buildIntentPrompt, parseAnalysis } from '~/utils/voiceIntent'
// Parses 'YYYY-MM-DD' as local midnight — see the note in priority.ts.
import { localDate } from '~/utils/priority'
import { useOpenAi } from '~/utils/ai/openAi/useOpenAi'
import loggedInUser from '~/utils/loggedInUser'

const Note = VoiceNoteModel as Model<any>
const Reminder = ReminderModel as Model<any>
const Doc = DocumentModel as Model<any>
const Lead = LeadModel as Model<any>

const bodySchema = z.object({
  transcript: z.string().min(2).max(4000),
  homeId: z.string().optional(),
  leadId: z.string().optional()
})

/**
 * POST /api/voice/note
 *
 * Takes a spoken note, works out what it was, and acts:
 *   question → answered against their real data
 *   reminder → created, UNCONFIRMED
 *   note     → kept as-is
 *
 * Reminders land unconfirmed on purpose. This is a transcription of a
 * transcription — the AI heard what the browser heard — so a misheard
 * "Thursday" would be a missed call. Same rule as extracted contract dates.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { transcript, homeId, leadId } = await readValidatedBody(event, bodySchema.parse)
  if (!process.env.OPENAI_API_KEY) {
    throw createError({ statusCode: 503, message: 'Voice notes are not configured yet.' })
  }

  const note = await Note.create({
    userId: user._id,
    transcript,
    homeId: homeId || undefined,
    leadId: leadId || undefined,
    status: 'processing'
  })

  try {
    // Give it enough context to resolve "the inspection" or "Whitefish Stage"
    // without re-reading any documents.
    const filter: Record<string, any> = { userId: user._id }
    if (homeId) filter.homeId = homeId
    if (leadId) filter.leadId = leadId

    const docs = await Doc.find(filter, { docType: 1, summary: 1, deadlines: 1 })
      .limit(20).lean() as any[]

    const context = docs.map((d) => {
      const dates = (d.deadlines ?? [])
        .filter((x: any) => !x.dismissed && !x.completed)
        .map((x: any) => `    ${x.label}: ${new Date(x.date).toISOString().slice(0, 10)}`)
        .join('\n')
      return [`  ${d.docType || 'Document'}`, dates].filter(Boolean).join('\n')
    }).join('\n')

    const today = new Date().toISOString().slice(0, 10)

    // Uses the app's existing OpenAI helper rather than a hand-rolled call.
    //
    // WHY OpenAI here: this is structured text extraction, which gpt-4o-mini
    // handles well and cheaply, and four other server utils already go through
    // this helper. One shared path means one place to change the model, one
    // error style, one thing to reason about.
    //
    // Anthropic stays for document reading — PDF document blocks are a real
    // capability difference, not a preference.
    const raw = await useOpenAi(
      [{ role: 'user', content: buildIntentPrompt(transcript, today, context) }],
      // Headroom so the JSON can't be cut off mid-object — a truncated
      // response parses as a failure and silently loses a reminder.
      // Low temperature because this is extraction, not writing.
      { maxTokens: 1200, temperature: 0.2 }
    )

    const analysis = raw ? parseAnalysis(raw) : null
    if (!analysis) throw new Error('could not understand the note')

    // Create any reminders — unconfirmed.
    const reminderIds: any[] = []
    for (const r of analysis.reminders) {
      const created = await Reminder.create({
        userId: user._id,
        text: r.text,
        dueAt: localDate(r.dueAt),
        priority: r.priority,
        homeId: homeId || undefined,
        leadId: leadId || undefined,
        source: 'voice',
        confirmed: false,
        heardAs: r.heardAs
      })
      reminderIds.push(created._id)
    }

    /**
     * Attach anything learned about a person to that person.
     *
     * Matched loosely by name, because speech gives "the Kellers" not an id.
     * If no confident match, it is NOT saved to a random contact — an
     * unattached fact is better than one filed against the wrong client.
     */
    const sphereSaved: { about: string; fact: string; matched: boolean }[] = []
    for (const f of (analysis as any).sphere ?? []) {
      const needle = String(f.about).replace(/^the\s+/i, '').trim()
      if (needle.length < 2) continue

      const matches = await Lead.find({
        userId: user._id,
        name: { $regex: needle.split(/\s+/)[0], $options: 'i' }
      }, { _id: 1, name: 1 }).limit(2).lean() as any[]

      // Exactly one match, or we don't guess.
      if (matches.length === 1) {
        await Lead.updateOne(
          { _id: matches[0]._id, userId: user._id },
          { $push: { sphereNotes: { text: f.fact, source: 'voice', capturedAt: new Date() } } }
        )
        sphereSaved.push({ about: matches[0].name, fact: f.fact, matched: true })
      } else {
        sphereSaved.push({ about: f.about, fact: f.fact, matched: false })
      }
    }

    await Note.updateOne({ _id: note._id }, {
      $set: {
        intent: analysis.intent,
        reminderIds,
        status: 'ready'
      }
    })

    return {
      noteId: String(note._id),
      intent: analysis.intent,
      note: analysis.note,
      question: analysis.question,
      sphere: sphereSaved,
      reminders: analysis.reminders.map((r, i) => ({
        _id: String(reminderIds[i] ?? ''),
        ...r
      }))
    }
  } catch (err: any) {
    console.error('[voice] note failed:', err?.data?.error?.message || err?.message)
    /**
     * Attach anything learned about a person to that person.
     *
     * Matched loosely by name, because speech gives "the Kellers" not an id.
     * If no confident match, it is NOT saved to a random contact — an
     * unattached fact is better than one filed against the wrong client.
     */
    const sphereSaved: { about: string; fact: string; matched: boolean }[] = []
    for (const f of (analysis as any).sphere ?? []) {
      const needle = String(f.about).replace(/^the\s+/i, '').trim()
      if (needle.length < 2) continue

      const matches = await Lead.find({
        userId: user._id,
        name: { $regex: needle.split(/\s+/)[0], $options: 'i' }
      }, { _id: 1, name: 1 }).limit(2).lean() as any[]

      // Exactly one match, or we don't guess.
      if (matches.length === 1) {
        await Lead.updateOne(
          { _id: matches[0]._id, userId: user._id },
          { $push: { sphereNotes: { text: f.fact, source: 'voice', capturedAt: new Date() } } }
        )
        sphereSaved.push({ about: matches[0].name, fact: f.fact, matched: true })
      } else {
        sphereSaved.push({ about: f.about, fact: f.fact, matched: false })
      }
    }

    await Note.updateOne({ _id: note._id }, {
      $set: {
        status: 'failed',
        // The transcript is saved either way — losing what they said because
        // the AI struggled would be the worst outcome here.
        failureReason: 'We saved what you said but could not work out what to do with it.'
      }
    })
    return {
      noteId: String(note._id),
      intent: 'note',
      note: transcript,
      question: '',
      reminders: [],
      degraded: true
    }
  }
})
