import { readFile } from 'node:fs/promises'
import { join, normalize, extname } from 'node:path'
import { hasR2 } from '~/utils/storage'

const MIME: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp',
  '.heic': 'image/heic', '.heif': 'image/heif'
}

/**
 * GET /api/uploads/local/<key>   — DEVELOPMENT ONLY
 * Serves what the PUT route stored. fetchAsBase64() reads through this when
 * extracting dates, so without it the document would upload and then fail to
 * be read.
 */
export default defineEventHandler(async (event) => {
  if (hasR2()) throw createError({ statusCode: 404, message: 'Not found.' })

  const key = (event.context.params?.key || '').split('/').filter(Boolean).join('/')
  const root = join(process.cwd(), '.data', 'uploads')
  const target = normalize(join(root, key))
  if (!target.startsWith(root)) throw createError({ statusCode: 400, message: 'Invalid key.' })

  try {
    const buf = await readFile(target)
    setHeader(event, 'Content-Type', MIME[extname(target).toLowerCase()] || 'application/octet-stream')
    setHeader(event, 'Cache-Control', 'private, max-age=3600')
    return buf
  } catch {
    throw createError({ statusCode: 404, message: 'File not found.' })
  }
})
