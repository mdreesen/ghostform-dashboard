import { connectDB } from "../../../lib/database/mongodb";
import type { Model } from 'mongoose';
import mongoose from 'mongoose';
import { Resend } from 'resend';
import LeadModelImport from '../../../lib/database/models/Lead';
import CampaignModelImport from '../../../lib/database/models/Campaign';
import { useCleanString } from '~/utils/formatters/useCleanString';
import { email_by_status } from '~/utils/email/useEmailByStatus';

const LeadModel = LeadModelImport as Model<any>
const CampaignModel = CampaignModelImport as Model<any>
const resend = new Resend(process.env.RESEND_KEY);

// Testing
// Go to this URL which is will fire off emails
// http://localhost:3000/api/test-reminder

export default defineTask({
  meta: {
    name: 'lead:reminders',
    description: 'Processes custom individual queues and recurring marketing blasts'
  },
  async run() {
    console.log('Orchestrating automated pipelines...');
    await connectDB();

    const now = new Date()
    const currentDay = now.getDay()
    const currentHour = now.getHours()

    try {
      // ==========================================
      // PART A: INDIVIDUAL HOURLY QUEUE REMINDERS
      // ==========================================
      const activeQueue = await LeadModel.find({
        reminderStatus: 'scheduled',
        reminderScheduledAt: { $lte: now },
        email: { $ne: '', $exists: true }
      }).populate('userId')

      if (activeQueue.length > 0) {
        const individualOps: any[] = []
        for (const lead of activeQueue) {
          const company_name = lead?.company_name || 'Your Connected Realtor';
          const replyEmail = lead?.company_email;
          const lead_name = lead.name ? lead.name.split(' ')[0] : 'there';
          const status = lead?.status;

          const useResponse = email_by_status(status, lead_name, company_name);

          await resend.emails.send({
            from: `${useCleanString(company_name)}@ascendpod.com`,
            to: lead.email,
            replyTo: replyEmail,
            subject: 'Quick question regarding your property search',
            text: useResponse
          })

          individualOps.push({
            updateOne: {
              filter: { _id: lead._id },
              update: { $set: { reminderStatus: 'sent' }, $unset: { reminderScheduledAt: '' } }
            }
          })
        }
        await LeadModel.bulkWrite(individualOps, { ordered: false })
      }

      // ==========================================
      // PART B: RECURRING STATUS BATCH CAMPAIGNS
      // ==========================================
      // Only execute recurring batch blasts once a day during the 9:00 AM local window
      if (currentHour === 9) {
        console.log('Processing scheduled recurring batch campaigns...')

        const todaysCampaigns = await CampaignModel.find({
          dayOfWeek: currentDay,
          $or: [
            { lastFiredAt: null },
            { lastFiredAt: { $lt: new Date(new Date().setHours(0, 0, 0, 0)) } }
          ]
        }).populate('userId')

        for (const campaign of todaysCampaigns) {
          if (campaign.lastFiredAt) {
            const daysSinceLastFire = (Date.now() - new Date(campaign.lastFiredAt).getTime()) / (1000 * 60 * 60 * 24)
            if (campaign.timesPerMonth === 2 && daysSinceLastFire < 13) continue
            if (campaign.timesPerMonth === 1 && daysSinceLastFire < 27) continue
          }

          const targets = await LeadModel.find({
            userId: campaign.userId._id,
            status: campaign.targetStatus,
            email: { $ne: '', $exists: true }
          }).lean()

          if (targets.length > 0) {
            const batchPayload = targets.map((lead) => {
              const greetingName = lead.name ? lead.name.split(' ')[0] : 'there'
              const agentName = campaign.userId.name

              // Inject the correct status format text dynamically
              const personalizedText = campaign.messageBody
                .replace(/{{name}}/g, greetingName)
                .replace(/{{agent}}/g, agentName)

              return {
                from: `${useCleanString(agentName)}@ascendpod.com`,
                to: lead.email,
                replyTo: campaign.userId.email || 'michaeldreesen90@gmail.com',
                subject: campaign.subject,
                text: personalizedText
              }
            })

            await resend.batch.send(batchPayload)
          }

          campaign.lastFiredAt = new Date()
          await campaign.save()
        }
      }

      return { result: 'All background delivery pipelines processed successfully.' }

    } catch (error: any) {
      console.error('Automation engine loop failed:', error)
      return { result: `Fault: ${error.message}` }
    }
  }
})