import { d as defineTask, c as connectDB, s as schemaImport } from '../nitro/nitro.mjs';
import { Resend } from 'resend';
import { C as CampaignModelImport } from './Campaign.mjs';
import { u as useCleanString } from './useCleanString.mjs';
import 'mongoose';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';

function email_by_status(status, lead_name, company_name) {
  const greeting = `Hi ${lead_name},

`;
  const signoff = `

Best,

${company_name}`;
  switch (status.toLowerCase()) {
    case "new":
      return greeting + `Thanks for checking out the property info details through our digital flyer.

I wanted to personally reach out and see if you had any quick questions about the home, the neighborhood, or local market trends that I can track down for you?

Just reply straight to this email whenever you have a second.` + signoff;
    case "appointment":
      return greeting + `I'm looking forward to our upcoming strategy session to go over your property goals.

Before we sync up, did any quick questions pop up about the neighborhood, local market data, or specific listings you've been tracking online?

Just reply straight to this email if there's anything specific you want me to pull ahead of time.` + signoff;
    case "active":
      return greeting + `We've been keeping a close eye on the market for you, and a few interesting shifts are happening locally.

As we keep sorting through inventory, do you have any quick questions about recent listings, pricing adjustments, or neighborhood trends?

Just reply straight to this email whenever you have a second and we can fine-tune our search.` + signoff;
    case "under contract":
      return greeting + `Things are moving along beautifully behind the scenes on your contract file.

I know there are a lot of moving parts right now during escrow. Did you have any quick questions about the inspection timelines, appraisal parameters, or next steps that I can clarify for you?

Just reply straight to this email whenever you have a second\u2014I'm tracking everything closely.` + signoff;
    case "closed":
      return greeting + `Congratulations again on your recent closing! I hope you are settling into the new space perfectly.

Now that the dust has settled, I wanted to reach out and see if you had any remaining questions about the home, local utility configurations, or contractors in the area?

Just reply straight to this email if anything comes up. I'm always here to help.` + signoff;
    case "archive":
      return greeting + `It's been a little while since we last touched base about your property search parameters.

I wanted to quickly check in and see if you had any new questions about the local market trends, or if your home buying timelines have shifted at all recently?

Just reply straight to this email whenever you have a second if you'd like to dive back in.` + signoff;
    default:
      return greeting + `I wanted to personally reach out and check in on your real estate goals.

Did you have any quick questions about current listings, neighborhood developments, or local market trends that I can track down for you?

Just reply straight to this email whenever you have a second.` + signoff;
  }
}

const LeadModel = schemaImport;
const CampaignModel = CampaignModelImport;
const resend = new Resend(process.env.RESEND_KEY);
function localWeekday(tz, now) {
  var _a, _b, _c;
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short"
    }).formatToParts(now);
    const weekdayStr = (_b = (_a = parts.find((p) => p.type === "weekday")) == null ? void 0 : _a.value) != null ? _b : "";
    const dayMap = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6
    };
    return (_c = dayMap[weekdayStr]) != null ? _c : now.getUTCDay();
  } catch {
    return now.getUTCDay();
  }
}
function minDaysBetweenFires(timesPerMonth) {
  switch (timesPerMonth) {
    case 4:
      return 6;
    // weekly
    case 2:
      return 13;
    // biweekly
    case 1:
      return 27;
    // monthly
    default:
      return 27;
  }
}
const reminders = defineTask({
  meta: {
    name: "lead:reminders",
    description: "Processes custom individual queues and recurring marketing blasts"
  },
  async run() {
    var _a;
    console.log("Orchestrating automated pipelines...");
    await connectDB();
    const now = /* @__PURE__ */ new Date();
    const startOfToday = new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
    let individualSent = 0;
    let campaignsFired = 0;
    let campaignEmails = 0;
    try {
      const activeQueue = await LeadModel.find({
        reminderStatus: "scheduled",
        reminderScheduledAt: { $lte: now },
        email: { $ne: "", $exists: true }
      }).populate("userId");
      if (activeQueue.length > 0) {
        const individualOps = [];
        for (const lead of activeQueue) {
          const company_name = (lead == null ? void 0 : lead.company_name) || "Your Connected Realtor";
          const replyEmail = lead == null ? void 0 : lead.company_email;
          const lead_name = lead.name ? lead.name.split(" ")[0] : "there";
          const status = lead == null ? void 0 : lead.status;
          const useResponse = email_by_status(status, lead_name, company_name);
          await resend.emails.send({
            from: `${useCleanString(company_name)}@ascendpod.com`,
            to: lead.email,
            replyTo: replyEmail,
            subject: "Quick question regarding your property search",
            text: useResponse
          });
          individualSent++;
          individualOps.push({
            updateOne: {
              filter: { _id: lead._id },
              update: {
                $set: { reminderStatus: "sent", lastContactedAt: now },
                $inc: { contactCount: 1 },
                $unset: { reminderScheduledAt: "" }
              }
            }
          });
        }
        await LeadModel.bulkWrite(individualOps, { ordered: false });
      }
      const candidateCampaigns = await CampaignModel.find({
        active: { $ne: false },
        // treat missing 'active' as active (legacy rows)
        $or: [
          { lastFiredAt: null },
          { lastFiredAt: { $lt: startOfToday } }
        ]
      }).populate("userId");
      for (const campaign of candidateCampaigns) {
        const tz = ((_a = campaign.userId) == null ? void 0 : _a.timezone) || "America/Denver";
        const localDay = localWeekday(tz, now);
        if (campaign.dayOfWeek !== localDay) continue;
        if (campaign.lastFiredAt) {
          const daysSinceLastFire = (now.getTime() - new Date(campaign.lastFiredAt).getTime()) / (1e3 * 60 * 60 * 24);
          if (daysSinceLastFire < minDaysBetweenFires(campaign.timesPerMonth)) {
            continue;
          }
        }
        const targets = await LeadModel.find({
          userId: campaign.userId._id,
          status: campaign.targetStatus,
          email: { $ne: "", $exists: true }
        }).lean();
        if (targets.length > 0) {
          const agentName = campaign.userId.name || "Your Realtor";
          const batchPayload = targets.map((lead) => {
            const greetingName = lead.name ? lead.name.split(" ")[0] : "there";
            const personalizedText = campaign.messageBody.replace(/{{name}}/g, greetingName).replace(/{{agent}}/g, agentName);
            return {
              from: `${useCleanString(agentName)}@ascendpod.com`,
              to: lead.email,
              replyTo: campaign.userId.email || "michaeldreesen90@gmail.com",
              subject: campaign.subject,
              text: personalizedText
            };
          });
          await resend.batch.send(batchPayload);
          campaignEmails += batchPayload.length;
          await LeadModel.updateMany(
            { _id: { $in: targets.map((t) => t._id) } },
            { $set: { lastContactedAt: now }, $inc: { contactCount: 1 } }
          );
        }
        campaign.lastFiredAt = now;
        await campaign.save();
        campaignsFired++;
      }
      const summary = {
        result: "All background delivery pipelines processed successfully.",
        individualSent,
        campaignsFired,
        campaignEmails
      };
      console.log("Pipeline summary:", summary);
      return summary;
    } catch (error) {
      console.error("Automation engine loop failed:", error);
      return { result: `Fault: ${error.message}` };
    }
  }
});

export { reminders as default };
//# sourceMappingURL=reminders.mjs.map
