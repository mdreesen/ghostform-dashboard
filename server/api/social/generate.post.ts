import { z } from 'zod'
import loggedInUser from '~/utils/loggedInUser'

const bodySchema = z.object({
  platform: z.enum(['facebook', 'instagram', 'x']),
  topic: z.string().default('personal'),
  details: z.string().optional(),
  count: z.number().min(1).max(5).optional()
})

/**
 * POST /api/social/generate
 * Returns post drafts in the realtor's voice. Does NOT save them — the UI shows
 * them first so nothing clutters the queue unless it's actually wanted.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { platform, topic, details, count } = await readValidatedBody(event, bodySchema.parse)

  const { posts, source } = await generateSocialPosts(
    platform,
    topic,
    {
      agentName: (user as any).name || (user as any).company,
      company: (user as any).company,
      region: (user as any).region,
      voice: (user as any).voice
    },
    { count, details }
  )

  return { platform, topic, source, posts }
})
