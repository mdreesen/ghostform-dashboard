import type { Model } from 'mongoose'
import DocumentModel from '../../../../lib/database/models/Document'
import { hasR2 } from '~/utils/storage'
import loggedInUser from '~/utils/loggedInUser'

const Doc = DocumentModel as Model<any>

/**
 * GET /api/documents/:id/view
 *
 * Returns a SHORT-LIVED signed URL for the file.
 *
 * Deliberately NOT using storage.ts `readUrl()`: that returns a public
 * NUXT_PUBLIC_ASSET_BASE URL when one is configured, which is right for
 * carousel images and wrong for contracts. A purchase agreement should never
 * sit on a permanently-guessable public URL.
 *
 * 5 minutes is enough to open a document and short enough that a copied link
 * is useless by the time it's shared.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const id = event.context.params?.id

  // Scoped to the owner — a document id must never be enough on its own.
  const doc = await Doc.findOne({ _id: id, userId: user._id }, { storageKey: 1, filename: 1, mime: 1 }).lean() as any
  if (!doc) throw createError({ statusCode: 404, message: 'Document not found.' })

  if (!hasR2()) {
    // Local driver: same-origin route, already auth-gated by the app.
    return { url: `/api/uploads/local/${doc.storageKey}`, filename: doc.filename, mime: doc.mime }
  }

  const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner')
  const { GetObjectCommand, S3Client } = await import('@aws-sdk/client-s3')

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
    }
  })

  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: doc.storageKey,
      // Makes the browser show the real filename rather than the storage key,
      // and display rather than force-download.
      ResponseContentDisposition: `inline; filename="${doc.filename.replace(/"/g, '')}"`,
      ResponseContentType: doc.mime || 'application/pdf'
    }),
    { expiresIn: 300 }
  )

  return { url, filename: doc.filename, mime: doc.mime }
})
