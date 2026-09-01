import type { Model } from 'mongoose'
import HomeModel from '../../../../lib/database/models/Home'
import LeadModel from '../../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'

const Home = HomeModel as Model<any>
const Lead = LeadModel as Model<any>

/**
 * GET /api/homes/:id
 *
 * Returns the property plus the leads attached to it, because the detail page
 * needs both and two round trips for one screen is wasteful.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const id = event.context.params?.id

  const home = await Home.findOne({ _id: id, userId: user._id }).lean() as any
  if (!home) throw createError({ statusCode: 404, message: 'Property not found.' })

  // Leads tied to this property. Falls back to an address match for leads
  // captured before homeId existed — an open-house form stamps the address,
  // so those still connect without a migration.
  const leads = await Lead.find({
    userId: user._id,
    $or: [
      { homeId: home._id },
      ...(home.address ? [{ address: home.address }] : [])
    ]
  })
    .sort({ createdAt: -1 })
    .limit(100)
    .lean()

  return { home, leads }
})
