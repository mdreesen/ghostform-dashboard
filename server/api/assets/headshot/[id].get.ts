import type { Model } from 'mongoose'
import AssetModel from '../../../../lib/database/models/Asset'
import { connectDB } from '../../../../lib/database/mongodb'

const Asset = AssetModel as Model<any>

/**
 * GET /api/assets/headshot/:id
 *
 * Serves a user's headshot as a real image response.
 *
 * Deliberately PUBLIC: this image is embedded in outgoing marketing emails,
 * which are opened by leads who have no session. It's a professional headshot
 * the agent has chosen to publish, and the id is an opaque ObjectId — but note
 * it IS readable by anyone holding that id.
 */
export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, message: 'Missing id.' })

  await connectDB()

  const asset = await Asset.findOne({ userId: id, kind: 'headshot' }).lean() as any
  if (!asset?.data) {
    throw createError({ statusCode: 404, message: 'No headshot.' })
  }

  const buffer = Buffer.from(asset.data, 'base64')

  setHeader(event, 'Content-Type', asset.mime || 'image/jpeg')
  setHeader(event, 'Content-Length', buffer.length)
  // Long cache is safe because re-uploads change the ?v= query on the URL.
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  return buffer
})
