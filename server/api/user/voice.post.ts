import { z } from 'zod'
import type { Model } from 'mongoose'
import UserModelImport from '../../../lib/database/models/User'
import loggedInUser from '~/utils/loggedInUser'

const User = UserModelImport as Model<any>

const bodySchema = z.object({
  tone: z.enum(['warm', 'straight', 'playful', 'polished']).optional(),
  about: z.string().max(500).optional(),
  focus: z.string().max(300).optional(),
  emoji: z.enum(['none', 'some', 'lots']).optional(),
  hashtags: z.enum(['none', 'few', 'many']).optional(),
  phrases: z.string().max(400).optional(),
  avoid: z.string().max(400).optional(),
  samples: z.string().max(4000).optional()
})

/**
 * POST /api/user/voice
 * Save the realtor's writing-voice profile. This is what stops generated posts
 * from sounding like every other agent's feed.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const voice = await readValidatedBody(event, bodySchema.parse)

  await User.updateOne(
    { _id: user._id },
    { $set: Object.fromEntries(Object.entries(voice).map(([k, v]) => [`voice.${k}`, v])) }
  )

  return { success: true }
})
