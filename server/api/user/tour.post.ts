import type { Model } from 'mongoose'
import UserModelImport from '../../../lib/database/models/User';
import loggedInUser from '~/utils/loggedInUser'

const User = UserModelImport as Model<any>

/**
 * POST /api/user/tour
 * Marks the guided tour as seen for this account, so it doesn't reappear when
 * the realtor logs in on another device (localStorage alone wouldn't cover that).
 * Non-critical: failures are swallowed by the caller.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) {
    throw createError({ statusCode: 401, message: 'Session expired.' })
  }

  await User.updateOne({ _id: user._id }, { $set: { tour_completed: true } })
  return { success: true }
})
