import type { Model } from 'mongoose'
import AssetModel from '../../../lib/database/models/Asset'
import UserModelImport from '../../../lib/database/models/User'
import loggedInUser from '~/utils/loggedInUser'

const Asset = AssetModel as Model<any>
const User = UserModelImport as Model<any>

/** Remove the stored headshot and clear the pointer on the user. */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  await Asset.deleteOne({ userId: user._id, kind: 'headshot' })
  await User.updateOne({ _id: user._id }, { $set: { headshot_url: '' } })

  return { success: true }
})
