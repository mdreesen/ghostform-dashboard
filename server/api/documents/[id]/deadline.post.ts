import { z } from 'zod'
import type { Model } from 'mongoose'
import DocumentModel from '../../../../lib/database/models/Document'
import { localDate } from '~/utils/priority'
import loggedInUser from '~/utils/loggedInUser'
import { isObjectId } from '~/utils/objectId'

const Doc = DocumentModel as Model<any>

const bodySchema = z.object({
  deadlineId: z.string(),
  action: z.enum(['confirm', 'dismiss', 'complete', 'reopen']),
  // Corrections — the realtor may fix a misread date or reprioritise.
  date: z.string().optional(),
  label: z.string().max(120).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional()
})

/** POST /api/documents/:id/deadline — confirm, correct, dismiss or complete. */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const routeId = event.context.params?.id
  if (!isObjectId(routeId)) {
    throw createError({ statusCode: 400, message: 'That link is missing an id.' })
  }

  const { deadlineId, action, date, label, priority } = await readValidatedBody(event, bodySchema.parse)

  const set: Record<string, any> = {}
  if (action === 'confirm') set['deadlines.$.confirmed'] = true
  if (action === 'dismiss') set['deadlines.$.dismissed'] = true
  if (action === 'complete') { set['deadlines.$.completed'] = true; set['deadlines.$.completedAt'] = new Date() }
  if (action === 'reopen') { set['deadlines.$.completed'] = false; set['deadlines.$.completedAt'] = null }

  // A correction implies confirmation — you wouldn't fix a date you're ignoring.
  if (date && !Number.isNaN(Date.parse(date))) {
    set['deadlines.$.date'] = localDate(date)
    set['deadlines.$.confirmed'] = true
  }
  if (label) set['deadlines.$.label'] = label
  if (priority) set['deadlines.$.priority'] = priority

  const res = await Doc.updateOne(
    { _id: event.context.params?.id, userId: user._id, 'deadlines._id': deadlineId },
    { $set: set }
  )
  if (res.matchedCount === 0) throw createError({ statusCode: 404, message: 'Not found.' })

  return { success: true }
})
