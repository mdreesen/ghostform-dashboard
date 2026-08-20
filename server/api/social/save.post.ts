import { z } from 'zod'
import type { Model } from 'mongoose'
import SocialPostModel from '../../../lib/database/models/SocialPost'
import loggedInUser from '~/utils/loggedInUser'

const SocialPost = SocialPostModel as Model<any>

const bodySchema = z.object({
  platform: z.enum(['facebook', 'instagram', 'x']),
  topic: z.string().default('general'),
  body: z.string().min(1),
  hashtags: z.string().optional(),
  imageIdea: z.string().optional(),
  status: z.enum(['draft', 'approved']).default('approved')
})

/**
 * POST /api/social/save
 * Save a (possibly edited) draft into the queue.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const data = await readValidatedBody(event, bodySchema.parse)

  const created = await SocialPost.create({ userId: user._id, ...data })
  return { success: true, _id: String(created._id) }
})
