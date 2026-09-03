import type { Model } from 'mongoose'
import PushSubscriptionModel from '../../../lib/database/models/PushSubscription'
import { pushConfigured } from '~~/server/utils/push'
import loggedInUser from '~/utils/loggedInUser'

const Sub = PushSubscriptionModel as Model<any>

/**
 * GET /api/push/status
 * The public VAPID key plus this user's devices. The key is public by design —
 * it's what the browser encrypts to.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const devices = await Sub.find({ userId: user._id }, { endpoint: 1, label: 1, prefs: 1, createdAt: 1 })
    .lean() as any[]

  return {
    configured: pushConfigured(),
    publicKey: process.env.VAPID_PUBLIC_KEY || '',
    devices: devices.map((d) => ({
      endpoint: d.endpoint,
      label: d.label,
      prefs: d.prefs,
      createdAt: d.createdAt
    }))
  }
})
