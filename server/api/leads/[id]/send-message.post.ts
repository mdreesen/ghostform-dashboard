import type { Model } from 'mongoose'
import { z } from 'zod'
import { Resend } from 'resend'
import LeadModelImport from '../../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'
import { useCleanString } from '~/utils/formatters/useCleanString'
import { isObjectId } from '~/utils/objectId'

const LeadModel = LeadModelImport as Model<any>
const resend = new Resend(process.env.RESEND_KEY)

const bodySchema = z.object({
  // The (possibly realtor-edited) message body to send.
  message: z.string().min(1),
  // Optional custom subject; defaults to a friendly follow-up line.
  subject: z.string().optional()
})

/**
 * POST /api/leads/:id/send-message
 * Sends a one-off personal email to the lead using the realtor's sending
 * identity, then stamps lastContactedAt so the lead drops off the daily
 * briefing (and increments contactCount).
 *
 * Uses the same @ascendpod.com from-address convention as the automated task,
 * so replies route back to the realtor via replyTo.
 */
export default defineEventHandler(async (event) => {
  const leadId = event.context.params?.id
  const user = await loggedInUser(event)

  if (!user?._id) {
    throw createError({ statusCode: 401, message: 'Session expired.' })
  }

  const { message, subject } = await readValidatedBody(event, bodySchema.parse)

  const lead = await LeadModel.findOne({ _id: leadId, userId: user._id }).lean()
  if (!lead) {
    throw createError({ statusCode: 404, message: 'Lead not found.' })
  }
  if (!lead.email) {
    throw createError({ statusCode: 400, message: 'This lead has no email address on file.' })
  }

  const agentName = (user as any).name || (user as any).company || 'Your Realtor'
  const replyTo = (user as any).email || undefined

  try {
    const response = await resend.emails.send({
      from: `${useCleanString(agentName)}@ascendpod.com`,
      to: lead.email,
      replyTo,
      subject: subject || 'Following up on your property search',
      text: message
    })

    // Record the touch so the briefing and leads table update.
    const now = new Date()
    await LeadModel.updateOne(
      { _id: lead._id, userId: user._id },
      {
        $set: { lastContactedAt: now, reminderStatus: 'none' },
        $inc: { contactCount: 1 },
        $unset: { reminderScheduledAt: '' }
      }
    )

    return { success: true, id: response.data?.id, lastContactedAt: now.toISOString() }
  } catch (error: any) {
    console.error('Failed to send lead message:', error?.message)
    throw createError({ statusCode: 502, message: 'Message could not be sent. Please try again.' })
  }
})
