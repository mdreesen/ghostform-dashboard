/**
 * DEV AUTOMATION TEST TRIGGER FOR BATCH CAMPAIGNS
 * NITRO SERVER ROUTE // GET REQUEST
 */
import type { Model } from 'mongoose'
import schemaImport from '../../lib/database/models/Lead'
import CampaignModelImport from '../../lib/database/models/Campaign'
import { Resend } from 'resend';
import { useCleanString } from '~/utils/formatters/useCleanString'


const LeadModel = schemaImport as Model<any>
const CampaignModel = CampaignModelImport as Model<any>
const resend = new Resend(process.env.RESEND_KEY)

export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV !== 'development') {
    throw createError({ statusCode: 403, message: 'Forbidden outside dev mode.' })
  }

  try {
    console.log('Forcing bypass execution of recurring batch marketing loops...')

    // 1. Snag the most recently created campaign template for testing
    const testCampaign = await CampaignModel.findOne().sort({ createdAt: -1 }).populate('userId')

    if (!testCampaign) {
      return { success: false, message: 'No campaign templates found to test. Create one on the marketing page first.' }
    }

    // 2. Pull targets matching that specific test campaign configuration
    const targets = await LeadModel.find({
      userId: testCampaign.userId._id,
      status: testCampaign.targetStatus,
      email: { $ne: '', $exists: true }
    }).lean()

    if (targets.length === 0) {
      return { 
        success: false, 
        message: `No leads found matching status: "${testCampaign.targetStatus}" for this realtor. Add a test lead with this status first!` 
      }
    }

    // 3. Compile and map payloads exactly like the background worker task does
    const batchPayload = targets.map((lead) => {
      const greetingName = lead.name ? lead.name.split(' ')[0] : 'there'
      const company_name = lead?.company_name ?? 'Your connected realtor';
      
      const personalizedText = testCampaign.messageBody
        .replace(/{{name}}/g, greetingName)
        .replace(/{{agent}}/g, company_name)

      return {
        from: `${useCleanString(company_name)}@ascendpod.com`,
        to: lead.email,
        replyTo: testCampaign.userId.email,
        subject: testCampaign.subject,
        text: personalizedText
      }
    })

    // 4. Fire directly out to Resend's batch endpoint
    const response = await resend.batch.create(batchPayload)

    return {
      success: true,
      message: `Successfully executed batch blast mock run. Sent ${targets.length} emails.`,
      batchId: response.data?.id,
      recipients: targets.map(t => t.email)
    }

  } catch (error: any) {
    return { success: false, error: error.message }
  }
})