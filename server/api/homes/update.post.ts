import { z } from 'zod'
import type { Model } from 'mongoose'
import HomeModel from '../../../lib/database/models/Home'
import loggedInUser from '~/utils/loggedInUser'

const Home = HomeModel as Model<any>

const bodySchema = z.object({
  _id: z.string(),
  name: z.string().nullish(),
  address: z.string().min(1),
  owner: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.enum(['active', 'pending', 'sold']).optional()
})

/** POST /api/homes/update — edit a property. Scoped to the owner. */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { _id, ...fields } = await readValidatedBody(event, bodySchema.parse)

  const res = await Home.updateOne({ _id, userId: user._id }, { $set: fields })
  if (res.matchedCount === 0) {
    throw createError({ statusCode: 404, message: 'Property not found.' })
  }
  return { success: true }
})
