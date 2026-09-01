import { buildDeadlineBriefing, deadlineHeadline } from '~/utils/deadlineBriefing';
import loggedInUser from '~/utils/loggedInUser'

/**
 * GET /api/documents/deadlines
 * Confirmed deadlines inside the horizon, for the daily briefing.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const items = await buildDeadlineBriefing(user._id)
  return { items, headline: deadlineHeadline(items) }
})
