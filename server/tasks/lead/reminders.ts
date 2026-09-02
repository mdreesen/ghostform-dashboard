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
 * Returns the weekday (0-6, Sun-Sat) in a given IANA timezone.
 *
 * NOTE: On Vercel's Hobby plan the cron can only run ONCE PER DAY, so we no
 * longer try to match a specific local hour (that only worked with an hourly
 * cron). We only need the realtor's local *day* so that a campaign set for
 * "Mondays" fires on their Monday, not the server's UTC Monday.
 * Falls back to server time if the timezone string is invalid.
 */
function localWeekday(tz: string, now: Date): number {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      weekday: 'short'
    }).formatToParts(now)

    const weekdayStr = parts.find((p) => p.type === 'weekday')?.value ?? ''
    const dayMap: Record<string, number> = {
      Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
    }
    return dayMap[weekdayStr] ?? now.getUTCDay()
  } catch {
    return now.getUTCDay()
  }
}

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
      // The cron runs once per day (Hobby plan limit). Any campaign whose
      // chosen weekday matches today (in the realtor's timezone) and whose
      // cadence spacing has elapsed will send on this run.
      const candidateCampaigns = await CampaignModel.find({
        active: { $ne: false }, // treat missing 'active' as active (legacy rows)
        $or: [
          { lastFiredAt: null },
          { lastFiredAt: { $lt: startOfToday } }
        ]
      }).populate('userId')

      for (const campaign of candidateCampaigns) {
        const tz = campaign.userId?.timezone || 'America/Denver'
        const localDay = localWeekday(tz, now)

        // Only fire on the campaign's chosen weekday (realtor's local day).
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
              replyTo: campaign.userId.email || 'whiteravendev90@gmail.com',
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

      // Morning push, for anyone who's turned notifications on. Wrapped so a
      // push failure can never break the email run, which matters more.
      let pushesSent = 0
      try {
        const { sendMorningPushes } = await import('../../utils/pushBriefing');
        const r = await sendMorningPushes()
        pushesSent = r.sent
        console.log('[cron] pushes:', r.sent, 'to', r.users, 'users')
      } catch (err: any) {
        console.error('[cron] push step failed (emails unaffected):', err?.message)
      }

      const summary = {
        result: 'All background delivery pipelines processed successfully.',
        individualSent,
        campaignsFired,
        campaignEmails,
        pushesSent
      }
      console.log('Pipeline summary:', summary)
      return summary

    } catch (error: any) {
      console.error('Automation engine loop failed:', error)
      return { result: `Fault: ${error.message}` }
    }
  }
})
