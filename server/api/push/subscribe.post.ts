import { z } from 'zod'
import type { Model } from 'mongoose'
import PushSubscriptionModel from '../../../lib/database/models/PushSubscription'
import loggedInUser from '~/utils/loggedInUser'

const Sub = PushSubscriptionModel as Model<any>

const bodySchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({ p256dh: z.string(), auth: z.string() }),
  label: z.string().max(60).optional()
})

/**
 * POST /api/push/subscribe
 *
 * Upsert by endpoint. The browser hands back the SAME endpoint if a device
 * re-subscribes, so this must not create duplicates — otherwise a realtor who
 * reinstalls gets every notification twice.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { endpoint, keys, label } = await readValidatedBody(event, bodySchema.parse)

  await Sub.findOneAndUpdate(
    { endpoint },
    {
      $set: { userId: user._id, endpoint, keys, label: label || '', failureCount: 0 },
      // Only on insert — never stomp preferences a returning device already set.
      $setOnInsert: { prefs: { deadlines: true, briefing: true, newLeads: false } }
    },
    { upsert: true, new: true }
  )

  return { success: true }
})
