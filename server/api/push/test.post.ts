import { sendToUser } from '~/utils/push'
import loggedInUser from '~/utils/loggedInUser'

/**
 * POST /api/push/test
 * Sends one notification to the caller's own devices. Worth having: push has
 * many silent failure points, and "did it arrive?" is the only real check.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const result = await sendToUser(user._id, {
    title: 'GhostForm',
    body: 'Notifications are working. This is the only test you\'ll get.',
    url: '/dashboard'
  }, 'briefing')

  return result
})
