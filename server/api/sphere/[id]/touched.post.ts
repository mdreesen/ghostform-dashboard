import type { Model } from 'mongoose'
import LeadModel from '../../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'
import { isObjectId } from '~/utils/objectId'

const Lead = LeadModel as Model<any>

/**
 * POST /api/sphere/:id/touched
 * Marks that you actually reached out — which is different from the system
 * having emailed them. Only a real call or text should reset the clock.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const routeId = event.context.params?.id
  if (!isObjectId(routeId)) {
    throw createError({ statusCode: 400, message: 'That link is missing an id.' })
  }

  const res = await Lead.updateOne(
    { _id: event.context.params?.id, userId: user._id },
    { $set: { lastTouchAt: new Date() } }
  )
  if (res.matchedCount === 0) throw createError({ statusCode: 404, message: 'Not found.' })
  return { success: true }
})
