import loggedInUser from '~/utils/loggedInUser'

/**
 * GET /api/briefing
 * Returns today's prioritized "who to contact" briefing for the current user.
 *
 * buildDailyBriefing and narrateBriefing live in server/utils and are
 * auto-imported by Nitro — no explicit import needed.
 *
 * Cheap enough to call on every dashboard load. The heavy lifting is a single
 * indexed Mongo query plus in-memory bucketing. The optional AI narration is
 * fire-and-forget with a hard fallback, so a slow/absent AI never blocks the
 * list from rendering.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)

  if (!user?._id) {
    throw createError({ statusCode: 401, message: 'Session trace missing or expired.' })
  }

  const briefing = await buildDailyBriefing(String(user._id), {
    coldLeadAfterDays: (user as any).coldLeadAfterDays ?? 14
  })

  // Try to upgrade the headline with AI narration; keep deterministic on any miss.
  const narrated = await narrateBriefing(briefing)
  if (narrated) briefing.headline = narrated

  return briefing
})
