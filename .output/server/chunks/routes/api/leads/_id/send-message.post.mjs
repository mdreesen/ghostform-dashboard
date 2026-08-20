import { a as defineEventHandler, b as createError, r as readValidatedBody, s as schemaImport } from '../../../../nitro/nitro.mjs';
import { z } from 'zod';
import { Resend } from 'resend';
import { l as loggedInUser } from '../../../../_/loggedInUser.mjs';
import { u as useCleanString } from '../../../../_/useCleanString.mjs';
import 'mongoose';
import 'openai';
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

const LeadModel = schemaImport;
const resend = new Resend(process.env.RESEND_KEY);
const bodySchema = z.object({
  // The (possibly realtor-edited) message body to send.
  message: z.string().min(1),
  // Optional custom subject; defaults to a friendly follow-up line.
  subject: z.string().optional()
});
const sendMessage_post = defineEventHandler(async (event) => {
  var _a, _b;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session expired." });
  }
  const { message, subject } = await readValidatedBody(event, bodySchema.parse);
  const lead = await LeadModel.findOne({ _id: leadId, userId: user._id }).lean();
  if (!lead) {
    throw createError({ statusCode: 404, message: "Lead not found." });
  }
  if (!lead.email) {
    throw createError({ statusCode: 400, message: "This lead has no email address on file." });
  }
  const agentName = user.name || user.company || "Your Realtor";
  const replyTo = user.email || void 0;
  try {
    const response = await resend.emails.send({
      from: `${useCleanString(agentName)}@ascendpod.com`,
      to: lead.email,
      replyTo,
      subject: subject || "Following up on your property search",
      text: message
    });
    const now = /* @__PURE__ */ new Date();
    await LeadModel.updateOne(
      { _id: lead._id, userId: user._id },
      {
        $set: { lastContactedAt: now, reminderStatus: "none" },
        $inc: { contactCount: 1 },
        $unset: { reminderScheduledAt: "" }
      }
    );
    return { success: true, id: (_b = response.data) == null ? void 0 : _b.id, lastContactedAt: now.toISOString() };
  } catch (error) {
    console.error("Failed to send lead message:", error == null ? void 0 : error.message);
    throw createError({ statusCode: 502, message: "Message could not be sent. Please try again." });
  }
});

export { sendMessage_post as default };
//# sourceMappingURL=send-message.post.mjs.map
