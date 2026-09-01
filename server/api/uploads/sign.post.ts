import { z } from 'zod'
import { presignUpload, buildKey } from '~/utils/storage'
import loggedInUser from '~/utils/loggedInUser'

const bodySchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
  bytes: z.number().int().positive(),
  /** 'document' for contracts, 'brand' for logos/headshots. */
  scope: z.enum(['document', 'brand']).default('document')
})

/** Documents can be large; contracts routinely run to 20MB scanned. */
const MAX_BYTES = 25 * 1024 * 1024

const ALLOWED = new Set([
  'application/pdf',
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'
])

/**
 * POST /api/uploads/sign
 *
 * Returns a short-lived URL the browser PUTs the file to directly. The file
 * never passes through this server — a 20MB contract through a serverless
 * function burns execution time and risks the body limit for no benefit.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { filename, contentType, bytes, scope } = await readValidatedBody(event, bodySchema.parse)

  if (!ALLOWED.has(contentType)) {
    throw createError({
      statusCode: 400,
      message: 'Upload a PDF or an image. Word documents need exporting to PDF first.'
    })
  }
  if (bytes > MAX_BYTES) {
    throw createError({ statusCode: 413, message: 'That file is larger than 25MB.' })
  }

  // Namespaced per user so a leaked key can't enumerate anyone else's contracts.
  const key = buildKey(String(user._id), scope, filename)
  const uploadUrl = await presignUpload(key, contentType)

  return { uploadUrl, key }
})
