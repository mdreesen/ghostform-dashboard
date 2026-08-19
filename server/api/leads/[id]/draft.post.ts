import type { Model } from 'mongoose'
import LeadModelImport from '../../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'

const LeadModel = LeadModelImport as Model<any>

/**
 * POST /api/leads/:id/draft
 * Body: { channel?: 'sms' | 'email' }  (defaults to 'sms')
 *
 * Returns a personalized outreach draft for the lead, grounded in their real
 * data. Uses AI if configured, otherwise a deterministic template - the realtor
 * always gets a usable message. Nothing is sent here; this is draft-only.
 */
export default defineEventHandler(async (event) => {
  const leadId = event.context.params?.id
  const user = await loggedInUser(event)

  if (!user?._id) {
    throw createError({ statusCode: 401, message: 'Session expired.' })
  }

  const body = await readBody(event).catch(() => ({}))
  const channel = body?.channel === 'email' ? 'email' : 'sms'

  const lead = await LeadModel.findOne({ _id: leadId, userId: user._id }).lean()
  if (!lead) {
    throw createError({ statusCode: 404, message: 'Lead not found.' })
  }

  const draft = await generateLeadDraft(
    {
      name: lead.name,
      budget: lead.budget,
      price: lead.price,
      want_to_move: lead.want_to_move,
      buy_sell_both: lead.buy_sell_both,
      bedrooms: lead.bedrooms,
      address: lead.address,
      status: lead.status,
      lastContactedAt: lead.lastContactedAt,
      agentName: (user as any).name || (user as any).company || 'Your agent'
    },
    channel
  )

  return { channel, ...draft }
})
