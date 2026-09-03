import { buildClosingPrompts } from '~~/server/utils/closingPrompt'
import loggedInUser from '~/utils/loggedInUser'

/** GET /api/closings — deals whose closing date has passed but aren't marked closed. */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })
  return buildClosingPrompts(user._id)
})
