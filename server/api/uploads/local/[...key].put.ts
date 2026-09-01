import { writeFile, mkdir } from 'node:fs/promises'
import { join, dirname, normalize } from 'node:path'
import { hasR2 } from '~/utils/storage'

/**
 * PUT /api/uploads/local/<key>   — DEVELOPMENT ONLY
 *
 * When R2 isn't configured, presignUpload() returns a URL pointing here
 * instead of to Cloudflare. Without this route that URL 404s, which is exactly
 * the "Upload failed (404)" you hit — storage.ts came across from the carousel
 * app with its local fallback, but these routes didn't come with it.
 *
 * Files land in .data/uploads. Not for production: a serverless filesystem is
 * ephemeral and per-instance, so the guard below refuses to run once R2 is
 * configured rather than silently shadowing real storage.
 */
export default defineEventHandler(async (event) => {
  if (hasR2()) throw createError({ statusCode: 404, message: 'Not found.' })

  const key = (event.context.params?.key || '').split('/').filter(Boolean).join('/')

  // Path traversal guard — a key like ../../etc/passwd must not escape .data.
  const root = join(process.cwd(), '.data', 'uploads')
  const target = normalize(join(root, key))
  if (!target.startsWith(root)) {
    throw createError({ statusCode: 400, message: 'Invalid key.' })
  }

  const body = await readRawBody(event, false)
  if (!body) throw createError({ statusCode: 400, message: 'Empty upload.' })

  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, body as Buffer)

  return { success: true }
})
