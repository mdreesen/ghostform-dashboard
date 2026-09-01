import type { Model } from 'mongoose'
import DocumentModel from '../../../../lib/database/models/Document'
import { readDocument } from '~/utils/documentRead';
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
            date: new Date(d.date),
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
      } else if (msg.startsWith('PDF:')) {
        reason = 'We could not open that PDF. If it is a scan, try a photo of the pages instead.'
      } else if (/storage/i.test(msg)) {
        reason = 'We could not open that file. Try uploading it again.'
      }

      await Doc.updateOne({ _id: id }, { $set: { status: 'failed', failureReason: reason } })
    }
  }

  event.waitUntil ? event.waitUntil(run()) : run()
  return { status: 'reading' }
})
