import type { Model } from 'mongoose'
import LeadModelImport from '../../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'

const LeadModel = LeadModelImport as Model<any>

/**
 * POST /api/leads/:id/contacted
 * Records that the realtor just made contact with this lead.
 *
 * Stamps lastContactedAt = now and increments contactCount. This is what
 * removes the lead from the daily "who to contact" briefing: the briefing
 * engine treats any lead contacted within coldLeadAfterDays as handled, so
 * the lead drops off today and auto-resurfaces only once it goes cold again.
 *
 * Also clears any overdue scheduled reminder, since the realtor has now
 * actually reached out.
 */
export default defineEventHandler(async (event) => {
  const leadId = event.context.params?.id
  const user = await loggedInUser(event)

  if (!user?._id) {
    throw createError({ statusCode: 401, message: 'Session expired.' })
  }

  try {
    const now = new Date()
    const result = await LeadModel.updateOne(
      { _id: leadId, userId: user._id }, // scoped so a realtor can only touch their own leads
      {
        $set: { lastContactedAt: now, reminderStatus: 'none' },
        $inc: { contactCount: 1 },
        $unset: { reminderScheduledAt: '' }
      }
    )

    if (result.matchedCount === 0) {
      throw createError({ statusCode: 404, message: 'Lead not found.' })
    }

    return { success: true, lastContactedAt: now.toISOString() }
  } catch (error: any) {
    if (error?.statusCode) throw error
    throw createError({ statusCode: 500, message: 'Could not update contact status.' })
  }
})
