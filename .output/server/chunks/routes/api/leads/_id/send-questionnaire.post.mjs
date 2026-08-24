import { a as defineEventHandler, b as createError, r as readValidatedBody, s as schemaImport } from '../../../../nitro/nitro.mjs';
import { z } from 'zod';
import { Resend } from 'resend';
import { l as loggedInUser } from '../../../../_/loggedInUser.mjs';
import 'mongoose';
import 'node:crypto';
import 'openai';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';

function ghostFormUrl(useCategory, useSource, useId, useName, useEmail, useCalendar, useLead, options) {
  const base = "https://ghostform-zeta.vercel.app/";
  const stripHash = (c) => (c || "").replace(/^#/, "");
  const params = new URLSearchParams();
  if (useCategory) params.set("category", useCategory);
  params.set("source", useSource);
  if (useCategory && useId) params.set("id", useId);
  if (useName) params.set("company_name", useName);
  if (useEmail) params.set("company_email", useEmail);
  if (useCalendar) params.set("calendar", useCalendar);
  if (useLead) params.set("lead", useLead);
  params.set("background_color", stripHash(void 0 ) || "F7F4EF");
  params.set("font_color", stripHash(void 0 ) || "1F1B16");
  return `${base}?${params.toString()}`;
}

const LeadModel = schemaImport;
const bodySchema = z.object({
  intent: z.enum(["buy", "sell"]).optional()
});
const sendQuestionnaire_post = defineEventHandler(async (event) => {
  var _a;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { intent } = await readValidatedBody(event, bodySchema.parse);
  const lead = await LeadModel.findOne({ _id: leadId, userId: user._id }).lean();
  if (!lead) throw createError({ statusCode: 404, message: "Lead not found." });
  if (!lead.email) throw createError({ statusCode: 400, message: "This lead has no email address." });
  const resolvedIntent = intent || (String(lead.buy_sell_both || "").toLowerCase().includes("sell") ? "sell" : "buy");
  process.env.CAPTURE_URL || "https://ghostform-zeta.vercel.app";
  const link = ghostFormUrl(user.category, "qualify", user == null ? void 0 : user._id, user.company_hashed, user.email_hashed, user == null ? void 0 : user.calendar_link, leadId);
  console.log("link", link);
  const u = user;
  const agentName = u.name || u.company || "Your agent";
  const firstName = String(lead.name || "").split(" ")[0] || "there";
  const accent = /^#[0-9A-Fa-f]{6}$/.test(u.brand_color || "") ? u.brand_color : "#B5563A";
  const subject = resolvedIntent === "sell" ? "A few questions before we talk about listing" : "A few questions to narrow down your search";
  const body = resolvedIntent === "sell" ? `Hi ${firstName},

Before we sit down, it would help to know a bit more about the property and what you're hoping for. It takes about five minutes, and it means our conversation starts somewhere useful instead of at the beginning.` : `Hi ${firstName},

To make sure I'm only sending you places worth your time, it would help to know a bit more about what you're after. It takes about five minutes and saves us both a lot of back and forth.`;
  const html = `<!DOCTYPE html><html><body style="margin:0;background:#EFEAE0;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
    <table role="presentation" width="100%" style="max-width:520px;background:#F7F4EF;border:1px solid #DDD6C9;">
      <tr><td style="height:4px;background:${accent};font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:30px 34px 0;">
        <p style="margin:0;font-family:Georgia,serif;font-size:17px;font-weight:600;color:#1F1B16;">${u.company || agentName}</p>
      </td></tr>
      <tr><td style="padding:24px 34px 0;">
        ${body.split("\n\n").map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1F1B16;">${p.replace(/\n/g, "<br>")}</p>`).join("")}
      </td></tr>
      <tr><td style="padding:10px 34px 34px;">
        <a href="${link}" style="display:inline-block;background:${accent};color:#F7F4EF;text-decoration:none;padding:14px 30px;font-size:12px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;">Answer the questions</a>
        <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:#8A847C;">\u2014 ${agentName}</p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
  try {
    const resend = new Resend(process.env.RESEND_KEY);
    await resend.emails.send({
      from: `${String(agentName).replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "noreply"}@ascendpod.com`,
      to: [lead.email],
      replyTo: u.email,
      subject,
      html,
      text: `${body}

${link}

\u2014 ${agentName}`
    });
  } catch (error) {
    console.error("[qualify] send failed:", error == null ? void 0 : error.message);
    throw createError({ statusCode: 502, message: "Could not send the email. Please try again." });
  }
  await LeadModel.updateOne({ _id: lead._id, userId: user._id }, {
    $set: { "qualification.sentAt": /* @__PURE__ */ new Date(), "qualification.intent": resolvedIntent }
  });
  return { success: true, link };
});

export { sendQuestionnaire_post as default };
//# sourceMappingURL=send-questionnaire.post.mjs.map
