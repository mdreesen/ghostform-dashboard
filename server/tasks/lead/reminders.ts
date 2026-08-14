import { connectDB } from "../../../lib/database/mongodb";
import type { Model } from 'mongoose';
import { Resend } from 'resend';
import LeadModelImport from '../../../lib/database/models/Lead';
import CampaignModelImport from '../../../lib/database/models/Campaign';
import { useCleanString } from '~/utils/formatters/useCleanString';
import { email_by_status } from '~/utils/email/useEmailByStatus';

const LeadModel = LeadModelImport as Model<any>
const CampaignModel = CampaignModelImport as Model<any>
const resend = new Resend(process.env.RESEND_KEY);

// Testing
// Go to this URL which will fire off emails:
// http://localhost:3000/api/test-reminder

/**
 * Returns the wall-clock hour (0-23) and weekday (0-6) in a given IANA
 * timezone. Lets us fire a realtor's campaign at *their* 9am, not UTC 9am.
 * Falls back to server time if the timezone string is invalid.
 */
function localHourAndDay(tz: string, now: Date): { hour: number; day: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: 'numeric',
      hour12: false,
      weekday: 'short'
    }).formatToParts(now)

    const hourStr = parts.find((p) => p.type === 'hour')?.value ?? '0'
    // Intl can return '24' for midnight in some environments - normalize.
    let hour = parseInt(hourStr, 10) % 24
    if (Number.isNaN(hour)) hour = now.getUTCHours()

    const weekdayStr = parts.find((p) => p.type === 'weekday')?.value ?? ''
    const dayMap: Record<string, number> = {
      Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
    }
    const day = dayMap[weekdayStr] ?? now.getUTCDay()

    return { hour, day }
  } catch {
    return { hour: now.getUTCHours(), day: now.getUTCDay() }
  }
}

// The local hour at which recurring batch campaigns should go out.
const CAMPAIGN_SEND_HOUR = 9

/**
 * Minimum days that must elapse before a campaign of a given cadence may fire
 * again. timesPerMonth: 4 = weekly, 2 = biweekly, 1 = monthly.
 * Guards use a small buffer (e.g. 6 not 7) so a job that runs a little late
 * one week doesn't skip an entire cycle.
 */
function minDaysBetweenFires(timesPerMonth: number): number {
  switch (timesPerMonth) {
    case 4: return 6   // weekly
    case 2: return 13  // biweekly
    case 1: return 27  // monthly
    default: return 27
  }
}

export default defineTask({
  meta: {
    name: 'lead:reminders',
    description: 'Processes custom individual queues and recurring marketing blasts'
  },
  async run() {
    console.log('Orchestrating automated pipelines...');
    await connectDB();

    const now = new Date()
    const startOfToday = new Date(new Date().setHours(0, 0, 0, 0))

    let individualSent = 0
    let campaignsFired = 0
    let campaignEmails = 0

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

          individualSent++

          // Stamp the contact so the daily briefing's cold-lead detection is
          // accurate. This is the crucial link between sending and tracking.
          individualOps.push({
            updateOne: {
              filter: { _id: lead._id },
              update: {
                $set: { reminderStatus: 'sent', lastContactedAt: now },
                $inc: { contactCount: 1 },
                $unset: { reminderScheduledAt: '' }
              }
            }
          })
        }
        await LeadModel.bulkWrite(individualOps, { ordered: false })
      }

      // ==========================================
      // PART B: RECURRING STATUS BATCH CAMPAIGNS
      // ==========================================
      // We can't pre-filter by hour in the query because "9am" is per-user
      // (timezone-dependent). So we pull candidate campaigns for the day and
      // check each realtor's local clock individually.
      const candidateCampaigns = await CampaignModel.find({
        active: { $ne: false }, // treat missing 'active' as active (legacy rows)
        $or: [
          { lastFiredAt: null },
          { lastFiredAt: { $lt: startOfToday } }
        ]
      }).populate('userId')

      for (const campaign of candidateCampaigns) {
        const tz = campaign.userId?.timezone || 'America/Denver'
        const { hour: localHour, day: localDay } = localHourAndDay(tz, now)

        // Only fire in the realtor's local 9am window, on the campaign's day.
        if (localHour !== CAMPAIGN_SEND_HOUR) continue
        if (campaign.dayOfWeek !== localDay) continue

        // Cadence guard - enforce spacing between sends.
        if (campaign.lastFiredAt) {
          const daysSinceLastFire =
            (now.getTime() - new Date(campaign.lastFiredAt).getTime()) /
            (1000 * 60 * 60 * 24)
          if (daysSinceLastFire < minDaysBetweenFires(campaign.timesPerMonth)) {
            continue
          }
        }

        const targets = await LeadModel.find({
          userId: campaign.userId._id,
          status: campaign.targetStatus,
          email: { $ne: '', $exists: true }
        }).lean()

        if (targets.length > 0) {
          const agentName = campaign.userId.name || 'Your Realtor'

          const batchPayload = targets.map((lead) => {
            const greetingName = lead.name ? lead.name.split(' ')[0] : 'there'
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
          campaignEmails += batchPayload.length

          // Stamp every lead we just blasted so they don't get flagged cold
          // and so contactCount stays truthful.
          await LeadModel.updateMany(
            { _id: { $in: targets.map((t) => t._id) } },
            { $set: { lastContactedAt: now }, $inc: { contactCount: 1 } }
          )
        }

        campaign.lastFiredAt = now
        await campaign.save()
        campaignsFired++
      }

      const summary = {
        result: 'All background delivery pipelines processed successfully.',
        individualSent,
        campaignsFired,
        campaignEmails
      }
      console.log('Pipeline summary:', summary)
      return summary

    } catch (error: any) {
      console.error('Automation engine loop failed:', error)
      return { result: `Fault: ${error.message}` }
    }
  }
})
