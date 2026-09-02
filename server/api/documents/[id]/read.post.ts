import type { Model } from 'mongoose'
import DocumentModel from '../../../../lib/database/models/Document'
import { readDocument } from '~/utils/documentRead';
import { localDate } from '~/utils/priority'
// Explicit, not auto-imported. Nitro auto-imports server/utils, but that
// didn't resolve here — and an explicit import fails at BUILD if the file is
// missing, rather than silently at runtime when a realtor uploads a contract.
import { fetchAsBase64 } from '~/utils/storage'
import loggedInUser from '~/utils/loggedInUser'

const Doc = DocumentModel as Model<any>

/**
 * POST /api/documents/:id/read
 *
 * Extracts dates. Status always resolves to ready or failed — never left on
 * 'reading', because a spinner that never stops on a legal document is worse
 * than an error.
 *
 * Every extracted date lands with confirmed:false. Nothing becomes a reminder
 * until the realtor agrees with it.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const id = event.context.params?.id
  const doc = await Doc.findOne({ _id: id, userId: user._id }).lean() as any
  if (!doc) throw createError({ statusCode: 404, message: 'Document not found.' })

  await Doc.updateOne({ _id: id }, { $set: { status: 'reading', failureReason: '' } })

  const run = async () => {
    try {
      const file = await fetchAsBase64(doc.storageKey)
      if (!file) throw new Error('Could not read the file from storage.')

      const reading = await readDocument(file.data, file.mime || doc.mime, doc.filename)
      if (!reading) throw new Error('The document could not be read.')

      await Doc.updateOne({ _id: id }, {
        $set: {
          docType: reading.docType,
          summary: reading.summary,
          // confirmed:false — these are proposals, not reminders.
          deadlines: reading.deadlines.map((d) => ({
            label: d.label,
            date: localDate(d.date),
            sourceText: d.sourceText,
            priority: d.priority,
            confirmed: false,
            dismissed: false,
            completed: false
          })),
          status: 'ready'
        }
      })
    } catch (err: any) {
      const msg = String(err?.message || '')
      console.error('[document] read failed for', id, msg)

      // Distinct causes get distinct messages. A single fallback made a
      // missing API header look like a problem with the document.
      let reason = 'We could not read that document. You can add dates yourself.'
      if (msg.startsWith('CONFIG:')) {
        reason = 'Document reading is not configured yet. This is on us — the AI key is missing or rejected.'
      } else if (msg.startsWith('RATE:')) {
        reason = 'Too many requests right now. Wait a minute and try reading it again.'
      } else if (msg.startsWith('TIMEOUT:')) {
        reason = 'Reading took too long. Try uploading it again.'
      } else if (msg.startsWith('SCANNED:')) {
        // A scan has no text layer. Photographing the pages routes through
        // the vision path instead, which does work.
        reason = 'That PDF is a scan with no readable text. Take a photo of the pages and upload that instead.'
      } else if (msg.startsWith('PDF:')) {
        reason = 'We could not open that PDF. If it is a scan, try a photo of the pages instead.'
      } else if (/storage/i.test(msg)) {
        reason = 'We could not open that file. Try uploading it again.'
      }

      await Doc.updateOne({ _id: id }, { $set: { status: 'failed', failureReason: reason } })
    }
  }

  /** Ensure a stuck row never stays on 'reading'. */
  const markTimedOut = async () => {
    await Doc.updateOne(
      { _id: id, status: 'reading' },
      { $set: { status: 'failed', failureReason: 'Reading took too long. Try uploading it again.' } }
    )
  }

  /**
   * AWAIT IT. Do not fire-and-forget.
   *
   * This used `event.waitUntil(run())` and returned immediately. On Vercel the
   * function is FROZEN as soon as the response is sent, so the extraction was
   * killed mid-flight — the document sat on status 'reading' forever and the
   * client polled a row that would never change.
   *
   * Extraction is one text parse plus one model call, ~5-15s. That's well
   * within the function limit and worth waiting for, since the alternative is
   * a queue we don't need yet.
   *
   * The timeout below guarantees the status always resolves. A spinner that
   * never stops on a legal document is worse than an error.
   */
  const TIMEOUT_MS = 55_000
  let timer: ReturnType<typeof setTimeout> | undefined

  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('TIMEOUT: reading took too long.')), TIMEOUT_MS)
  })

  try {
    await Promise.race([run(), timeout])
  } catch (err: any) {
    if (String(err?.message || '').startsWith('TIMEOUT:')) await markTimedOut()
  } finally {
    if (timer) clearTimeout(timer)
  }

  const fresh = await Doc.findOne({ _id: id }, { status: 1, failureReason: 1 }).lean() as any
  return { status: fresh?.status ?? 'ready', failureReason: fresh?.failureReason ?? '' }
})
