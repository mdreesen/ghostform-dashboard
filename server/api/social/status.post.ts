import { z } from 'zod'
import type { Model } from 'mongoose'
import SocialPostModel from '../../../lib/database/models/SocialPost'
import loggedInUser from '~/utils/loggedInUser'

const SocialPost = SocialPostModel as Model<any>

const bodySchema = z.object({
  _id: z.string(),
  status: z.enum(['draft', 'approved', 'posted', 'discarded']),
  body: z.string().optional()
})

/**
 * POST /api/social/status
 * Move a post through the queue (and optionally save an edit at the same time).
 * Scoped to the owner so one realtor can't touch another's posts.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { _id, status, body } = await readValidatedBody(event, bodySchema.parse)

  const update: Record<string, any> = { status }
  if (typeof body === 'string' && body.trim()) update.body = body.trim()
  if (status === 'posted') update.postedAt = new Date()

  const res = await SocialPost.updateOne({ _id, userId: user._id }, { $set: update })
  if (res.matchedCount === 0) {
    throw createError({ statusCode: 404, message: 'Post not found.' })
  }

  return { success: true }
})
