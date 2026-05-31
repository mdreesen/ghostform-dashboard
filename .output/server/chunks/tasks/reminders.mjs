import { v as defineTask } from '../nitro/nitro.mjs';
import { c as connectDB } from '../_/mongodb.mjs';
import { Resend } from 'resend';
import { L as LeadModel$1 } from '../_/Lead.mjs';
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
import 'mongoose';

function useCleanString(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "");
}

const LeadModel = LeadModel$1;
const resend = new Resend(process.env.RESEND_KEY);
const reminders = defineTask({
  meta: {
    name: "lead:reminders",
    description: "Polls the dynamic queue hourly for explicit, agent-scheduled reminders"
  },
  async run() {
    await connectDB();
    console.log("Polling dynamic reminder queue...");
    const now = /* @__PURE__ */ new Date();
    try {
      const activeQueue = await LeadModel.find({
        reminderStatus: "scheduled",
        reminderScheduledAt: { $lte: now },
        email: { $ne: "", $exists: true }
      }).populate("userId");
      if (activeQueue.length === 0) {
        return { result: "Queue empty. No custom reminder configurations due in this hour." };
      }
      let processedCount = 0;
      const bulkOps = [];
      for (const lead of activeQueue) {
        const realtor = lead.userId;
        const senderName = (lead == null ? void 0 : lead.company_name) || "Your Connected Realtor";
        const replyEmail = lead == null ? void 0 : lead.company_email;
        const greetingName = lead.name ? lead.name.split(" ")[0] : "there";
        await resend.emails.send({
          from: `${useCleanString(senderName)}@ascendpod.com`,
          to: lead.email,
          replyTo: replyEmail,
          subject: "Quick question regarding your property search",
          text: `Hi ${greetingName},

I wanted to personally reach out and see if you had any quick questions about the home, the neighborhood, or local market trends that I can track down for you?

Just reply straight to this email whenever you have a second.

Best,

${senderName}`
        });
        bulkOps.push({
          updateOne: {
            filter: { _id: lead._id },
            update: {
              $set: { reminderStatus: "sent" },
              $unset: { reminderScheduledAt: "" }
              // Clean up date index allocations
            }
          }
        });
        processedCount++;
      }
      if (bulkOps.length > 0) {
        await LeadModel.bulkWrite(bulkOps, { ordered: false });
      }
      return { result: `Successfully synchronized queue. Dispatched ${processedCount} custom reminders.` };
    } catch (error) {
      console.error("Queue execution failed:", error);
      return { result: "Critical failure during queue parsing process." };
    }
  }
});

export { reminders as default };
//# sourceMappingURL=reminders.mjs.map
