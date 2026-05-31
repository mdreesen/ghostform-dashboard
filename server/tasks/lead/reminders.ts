import { connectDB } from "../../../lib/database/mongodb";
import type { Model } from 'mongoose';
import { Resend } from 'resend'
import schemaImport from '../../../lib/database/models/Lead';
import { useCleanString } from '~/utils/formatters/useCleanString'
import { email_by_status } from '~/utils/email/useEmailByStatus';
const LeadModel = schemaImport as Model<any>
const resend = new Resend(process.env.RESEND_KEY)

export default defineTask({

  meta: {
    name: 'lead:reminders',
    description: 'Polls the dynamic queue hourly for explicit, agent-scheduled reminders'
  },
  async run() {
    await connectDB();

    console.log('Polling dynamic reminder queue...')
    const now = new Date();

    try {
      // 1. Fetch only leads intentionally scheduled by the agent that are due for delivery
      const activeQueue = await LeadModel.find({
        reminderStatus: 'scheduled',
        reminderScheduledAt: { $lte: now },
        email: { $ne: '', $exists: true }
      }).populate('userId')

      if (activeQueue.length === 0) {
        return { result: 'Queue empty. No custom reminder configurations due in this hour.' }
      }

      let processedCount = 0
      const bulkOps: any[] = []

      for (const lead of activeQueue) {
        const company_name = lead?.company_name || 'Your Connected Realtor';
        const replyEmail = lead?.company_email;
        const lead_name = lead.name ? lead.name.split(' ')[0] : 'there';
        const status = lead?.status;

        const useResponse = email_by_status(status, lead_name, company_name);

        // 2. Dispatch the email via Resend
        await resend.emails.send({
          from: `${useCleanString(company_name)}@ascendpod.com`,
          to: lead.email,
          replyTo: replyEmail,
          subject: 'Quick question regarding your property search',
          text: useResponse
        })

        // 3. Mark the queue item as cleanly delivered
        bulkOps.push({
          updateOne: {
            filter: { _id: lead._id },
            update: {
              $set: { reminderStatus: 'sent' },
              $unset: { reminderScheduledAt: '' } // Clean up date index allocations
            }
          }
        })

        processedCount++
      }

      if (bulkOps.length > 0) {
        await LeadModel.bulkWrite(bulkOps, { ordered: false })
      }

      return { result: `Successfully synchronized queue. Dispatched ${processedCount} custom reminders.` }

    } catch (error) {
      console.error('Queue execution failed:', error)
      return { result: 'Critical failure during queue parsing process.' }
    }
  }
})