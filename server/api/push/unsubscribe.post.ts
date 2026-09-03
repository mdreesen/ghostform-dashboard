import { z } from 'zod'
import type { Model } from 'mongoose'
import PushSubscriptionModel from '../../../lib/database/models/PushSubscription'
import loggedInUser from '~/utils/loggedInUser'

const Sub = PushSubscriptionModel as Model<any>
const bodySchema = z.object({ endpoint: z.string() })

/** POST /api/push/unsubscribe */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { endpoint } = await readValidatedBody(event, bodySchema.parse)
  await Sub.deleteOne({ endpoint, userId: user._id })
  return { success: true }
})
