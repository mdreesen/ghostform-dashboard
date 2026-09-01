import { z } from 'zod'
import type { Model } from 'mongoose'
import ReminderModel from '../../../../lib/database/models/Reminder'
import loggedInUser from '~/utils/loggedInUser'

const Reminder = ReminderModel as Model<any>

const bodySchema = z.object({
  action: z.enum(['confirm', 'complete', 'dismiss', 'reopen']),
  dueAt: z.string().optional(),
  text: z.string().max(200).optional()
})

/** POST /api/reminders/:id — confirm, correct, complete or dismiss. */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { action, dueAt, text } = await readValidatedBody(event, bodySchema.parse)

  const set: Record<string, any> = {}
  if (action === 'confirm') set.confirmed = true
  if (action === 'complete') { set.completed = true; set.completedAt = new Date() }
  if (action === 'reopen') { set.completed = false; set.completedAt = null }
  if (action === 'dismiss') set.dismissed = true

  // Correcting implies confirming — you wouldn't fix a time you're ignoring.
  if (dueAt && !Number.isNaN(Date.parse(dueAt))) { set.dueAt = new Date(dueAt); set.confirmed = true }
  if (text) { set.text = text; set.confirmed = true }

  const res = await Reminder.updateOne(
    { _id: event.context.params?.id, userId: user._id },
    { $set: set }
  )
  if (res.matchedCount === 0) throw createError({ statusCode: 404, message: 'Reminder not found.' })

  return { success: true }
})
