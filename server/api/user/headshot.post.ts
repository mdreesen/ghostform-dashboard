import { z } from 'zod'
import type { Model } from 'mongoose'
import AssetModel from '../../../lib/database/models/Asset'
import UserModelImport from '../../../lib/database/models/User'
import loggedInUser from '~/utils/loggedInUser'

const Asset = AssetModel as Model<any>
const User = UserModelImport as Model<any>

// ~400KB of base64 ≈ a 300KB image. The client compresses to well under this;
// the cap exists to stop an oversized or malicious payload reaching Mongo.
const MAX_BASE64 = 400_000

const bodySchema = z.object({
  // data URL from the client-side canvas compressor
  image: z.string().min(50),
  width: z.number().optional(),
  height: z.number().optional()
})

export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { image, width, height } = await readValidatedBody(event, bodySchema.parse)

  const match = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(image)
  if (!match) {
    throw createError({
      statusCode: 400,
      message: 'Unsupported image. Use a JPEG, PNG or WebP.'
    })
  }

  const [, mime, data] = match
  if (data!.length > MAX_BASE64) {
    throw createError({
      statusCode: 413,
      message: 'That image is too large even after compression. Try a smaller one.'
    })
  }

  await Asset.findOneAndUpdate(
    { userId: user._id, kind: 'headshot' },
    {
      userId: user._id,
      kind: 'headshot',
      mime,
      data,
      bytes: Math.round(data!.length * 0.75),
      width: width ?? 0,
      height: height ?? 0
    },
    { upsert: true, new: true }
  )

  // Point the user's headshot_url at our OWN endpoint. Same-origin means the
  // social card canvas isn't tainted and PNG export keeps working — the exact
  // failure a pasted external URL causes.
  // The version query busts caches after a re-upload.
  const url = `/api/assets/headshot/${String(user._id)}?v=${Date.now()}`
  await User.updateOne({ _id: user._id }, { $set: { headshot_url: url } })

  return { success: true, url }
})
