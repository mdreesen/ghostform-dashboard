import { z } from 'zod'
import type { Model } from 'mongoose'
import LeadModel from '../../../../lib/database/models/Lead'
import { localDate } from '~/utils/priority'
import loggedInUser from '~/utils/loggedInUser'
import { isObjectId } from '~/utils/objectId'

const Lead = LeadModel as Model<any>

const bodySchema = z.object({
  closedAt: z.string().optional(),
  closedAddress: z.string().max(160).optional(),
  /** How often this person is worth hearing from, in months. */
  touchEveryMonths: z.number().min(1).max(24).optional(),
  /** Undo — puts them back to an active lead. */
  reopen: z.boolean().optional()
})

/**
 * POST /api/leads/:id/close
 *
 * Marks a deal closed, which is what turns a lead into a past client.
 *
 * `closedAt` doubles as the home anniversary, so it defaults to today but is
 * editable — most agents will be back-filling deals that closed months ago.
 *
 * `lastTouchAt` is seeded to the closing date, so someone who closed two years
 * ago and never heard from you again shows as two years quiet rather than as
 * freshly contacted.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const routeId = event.context.params?.id
  if (!isObjectId(routeId)) {
    throw createError({ statusCode: 400, message: 'That link is missing an id.' })
  }

  const body = await readValidatedBody(event, bodySchema.parse)
  const id = event.context.params?.id

  if (body.reopen) {
    const r = await Lead.updateOne(
      { _id: id, userId: user._id },
      { $set: { status: 'contacted' }, $unset: { closedAt: '', closedAddress: '' } }
    )
    if (r.matchedCount === 0) throw createError({ statusCode: 404, message: 'Lead not found.' })
    return { success: true, closed: false }
  }

  const closedAt = body.closedAt ? localDate(body.closedAt) : new Date()

  const existing = await Lead.findOne({ _id: id, userId: user._id }, { lastTouchAt: 1 }).lean() as any
  if (!existing) throw createError({ statusCode: 404, message: 'Lead not found.' })

  const set: Record<string, any> = {
    status: 'closed',
    closedAt,
    closedAddress: body.closedAddress ?? '',
    touchEveryMonths: body.touchEveryMonths ?? 4
  }
  // Only seed on first close — don't wipe a real touch date on re-save.
  if (!existing.lastTouchAt) set.lastTouchAt = closedAt

  await Lead.updateOne({ _id: id, userId: user._id }, { $set: set })
  return { success: true, closed: true }
})
