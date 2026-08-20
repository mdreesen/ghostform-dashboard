import { z } from 'zod'
import type { Model } from 'mongoose'
import CampaignModel from '../../../lib/database/models/Campaign'
import loggedInUser from '~/utils/loggedInUser'

const Campaign = CampaignModel as Model<any>

const bodySchema = z.object({
  _id: z.string(),
  varyWording: z.boolean()
})

/**
 * POST /api/campaigns/vary
 * Turn per-send rewording on or off for one campaign. Scoped to the owner.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { _id, varyWording } = await readValidatedBody(event, bodySchema.parse)

  const res = await Campaign.updateOne(
    { _id, userId: user._id },
    { $set: { varyWording } }
  )
  if (res.matchedCount === 0) {
    throw createError({ statusCode: 404, message: 'Campaign not found.' })
  }
  return { success: true, varyWording }
})
