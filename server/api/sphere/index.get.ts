import { buildSphereBriefing } from '~~/server/utils/sphereBriefing'
import loggedInUser from '~/utils/loggedInUser'

/** GET /api/sphere — who's gone quiet, and why to call them. */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const limit = Math.min(Number(getQuery(event).limit ?? 5), 20)
  return buildSphereBriefing(user._id, limit)
})
