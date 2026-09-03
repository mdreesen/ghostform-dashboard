import { z } from 'zod'
import type { Model } from 'mongoose'
import LeadModel from '../../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'
import { isObjectId } from '~/utils/objectId'

const Lead = LeadModel as Model<any>

const bodySchema = z.object({
  text: z.string().min(2).max(200).optional(),
  /** Remove one by its captured timestamp. */
  removeAt: z.string().optional()
})

/**
 * POST /api/leads/:id/sphere-note
 *
 * Adds something you know about a person by hand. Voice is the fast path, but
 * typing has to work too — a realtor at a desk with three things to record
 * shouldn't have to talk to their laptop.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const routeId = event.context.params?.id
  if (!isObjectId(routeId)) {
    throw createError({ statusCode: 400, message: 'That link is missing an id.' })
  }

  const { text, removeAt } = await readValidatedBody(event, bodySchema.parse)
  const id = event.context.params?.id

  if (removeAt) {
    const r = await Lead.updateOne(
      { _id: id, userId: user._id },
      { $pull: { sphereNotes: { capturedAt: new Date(removeAt) } } }
    )
    if (r.matchedCount === 0) throw createError({ statusCode: 404, message: 'Lead not found.' })
    return { success: true }
  }

  if (!text) throw createError({ statusCode: 400, message: 'Nothing to save.' })

  const r = await Lead.updateOne(
    { _id: id, userId: user._id },
    { $push: { sphereNotes: { text, source: 'typed', capturedAt: new Date() } } }
  )
  if (r.matchedCount === 0) throw createError({ statusCode: 404, message: 'Lead not found.' })

  return { success: true }
})
