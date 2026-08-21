import { z } from 'zod'
import type { Model } from 'mongoose'
import HomeModel from '../../../lib/database/models/Home'
import loggedInUser from '~/utils/loggedInUser'

const Home = HomeModel as Model<any>

const bodySchema = z.object({ _id: z.string() })

/** POST /api/homes/delete — remove a property. Scoped to the owner. */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { _id } = await readValidatedBody(event, bodySchema.parse)

  const res = await Home.deleteOne({ _id, userId: user._id })
  if (res.deletedCount === 0) {
    throw createError({ statusCode: 404, message: 'Property not found.' })
  }
  return { success: true }
})
