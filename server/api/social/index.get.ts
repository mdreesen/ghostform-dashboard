import type { Model } from 'mongoose'
import SocialPostModel from '../../../lib/database/models/SocialPost'
import loggedInUser from '~/utils/loggedInUser'

const SocialPost = SocialPostModel as Model<any>

/**
 * GET /api/social
 * The realtor's saved posts, newest first, grouped by status for the queue UI.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const all = await SocialPost.find({
    userId: user._id,
    status: { $ne: 'discarded' }
  }).sort({ createdAt: -1 }).limit(60).lean()

  return {
    approved: all.filter((p: any) => p.status === 'approved'),
    drafts: all.filter((p: any) => p.status === 'draft'),
    posted: all.filter((p: any) => p.status === 'posted').slice(0, 15)
  }
})
