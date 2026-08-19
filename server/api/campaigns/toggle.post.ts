import { z } from 'zod'
import type { Model } from 'mongoose'
import CampaignModel from '../../../lib/database/models/Campaign'
import loggedInUser from '~/utils/loggedInUser'

const Campaign = CampaignModel as Model<any>

const bodySchema = z.object({
  _id: z.string(),
  active: z.boolean()
})

/**
 * POST /api/campaigns/toggle
 * Pause or resume a recurring campaign without deleting it. Scoped to the
 * owning user so one realtor can't flip another's automation.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) {
    throw createError({ statusCode: 401, message: 'Session trace missing or expired.' })
  }

  const body = await readValidatedBody(event, bodySchema.parse)

  try {
    await Campaign.updateOne(
      { _id: body._id, userId: user._id },
      { $set: { active: body.active } }
    )
    return { success: true, active: body.active }
  } catch (error: any) {
    throw createError({ statusCode: 500, message: 'Failed to update campaign state.' })
  }
})
