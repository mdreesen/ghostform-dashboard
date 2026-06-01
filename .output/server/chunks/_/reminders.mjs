import { v as defineTask } from '../nitro/nitro.mjs';
import mongoose from 'mongoose';
import { Resend } from 'resend';
import { s as schemaImport } from './Lead.mjs';
import { C as CampaignModelImport } from './Campaign.mjs';
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

function useCleanString(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "");
}

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
const reminders = defineTask({
  meta: {
    name: "lead:reminders",
    description: "Processes custom individual queues and recurring marketing blasts"
  },
  async run() {
    console.log("Orchestrating automated pipelines...");
    const now = /* @__PURE__ */ new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    if (mongoose.connection.readyState !== 1) {
      console.warn("Database channel offline. Deferring task execution loop.");
      return { result: "Skipped: Mongoose connection unready." };
    }
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
          individualOps.push({
            updateOne: {
              filter: { _id: lead._id },
              update: { $set: { reminderStatus: "sent" }, $unset: { reminderScheduledAt: "" } }
            }
          });
        }
        await LeadModel.bulkWrite(individualOps, { ordered: false });
      }
      if (currentHour === 9) {
        console.log("Processing scheduled recurring batch campaigns...");
        const todaysCampaigns = await CampaignModel.find({
          dayOfWeek: currentDay,
          $or: [
            { lastFiredAt: null },
            { lastFiredAt: { $lt: new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)) } }
          ]
        }).populate("userId");
        for (const campaign of todaysCampaigns) {
          if (campaign.lastFiredAt) {
            const daysSinceLastFire = (Date.now() - new Date(campaign.lastFiredAt).getTime()) / (1e3 * 60 * 60 * 24);
            if (campaign.timesPerMonth === 2 && daysSinceLastFire < 13) continue;
            if (campaign.timesPerMonth === 1 && daysSinceLastFire < 27) continue;
          }
          const targets = await LeadModel.find({
            userId: campaign.userId._id,
            status: campaign.targetStatus,
            email: { $ne: "", $exists: true }
          }).lean();
          if (targets.length > 0) {
            const batchPayload = targets.map((lead) => {
              const greetingName = lead.name ? lead.name.split(" ")[0] : "there";
              const agentName = campaign.userId.name;
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
          }
          campaign.lastFiredAt = /* @__PURE__ */ new Date();
          await campaign.save();
        }
      }
      return { result: "All background delivery pipelines processed successfully." };
    } catch (error) {
      console.error("Automation engine loop failed:", error);
      return { result: `Fault: ${error.message}` };
    }
  }
});

export { reminders as default };
//# sourceMappingURL=reminders.mjs.map
