import { z } from 'zod'
import type { Model } from 'mongoose'
import LeadModel from '../../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'
import { isObjectId } from '~/utils/objectId'

const Lead = LeadModel as Model<any>

const bodySchema = z.object({
  stage: z.enum(['new', 'working', 'showing', 'under_contract', 'past_client', 'lost'])
})

/**
 * POST /api/leads/:id/stage
 *
 * Moving to past_client is deliberately NOT handled here — that goes through
 * /close, which also captures the anniversary date and address. Two ways to
 * reach the same state is how those fields end up empty.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const routeId = event.context.params?.id
  if (!isObjectId(routeId)) {
    throw createError({ statusCode: 400, message: 'That link is missing an id.' })
  }

  const { stage } = await readValidatedBody(event, bodySchema.parse)

  if (stage === 'past_client') {
    throw createError({
      statusCode: 400,
      message: 'Use the closing form so the anniversary date is captured.'
    })
  }

  const set: Record<string, any> = { stage }
  // Moving off "new" means you've made contact — keep the old status field in
  // step so the morning briefing keeps working.
  if (stage !== 'new') set.status = 'contacted'

  const res = await Lead.updateOne({ _id: event.context.params?.id, userId: user._id }, { $set: set })
  if (res.matchedCount === 0) throw createError({ statusCode: 404, message: 'Lead not found.' })

  return { success: true, stage }
})
