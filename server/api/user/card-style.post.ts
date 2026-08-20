import { z } from 'zod'
import type { Model } from 'mongoose'
import UserModelImport from '../../../lib/database/models/User'
import loggedInUser from '~/utils/loggedInUser'

const User = UserModelImport as Model<any>

const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/)

const bodySchema = z.object({
  theme: z.enum(['light', 'dark', 'accent', 'custom']).optional(),
  bg: hex.optional(),
  fg: hex.optional(),
  accent: hex.optional(),
  showAvatar: z.boolean().optional(),
  showBar: z.boolean().optional(),
  ratio: z.enum(['square', 'story', 'landscape']).optional()
})

/**
 * POST /api/user/card-style
 * Remember how this realtor likes their social cards, so the next one matches.
 * Colours are hex-validated here so a bad value can't break canvas rendering.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const style = await readValidatedBody(event, bodySchema.parse)

  await User.updateOne(
    { _id: user._id },
    { $set: Object.fromEntries(Object.entries(style).map(([k, v]) => [`cardStyle.${k}`, v])) }
  )

  return { success: true }
})
