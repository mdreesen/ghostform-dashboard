import { a as defineEventHandler, e as setHeader, w as readQualifyToken, b as createError, r as readValidatedBody, c as connectDB, s as schemaImport, o as analyseLead } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import 'mongoose';
import 'node:crypto';
import 'openai';
import 'resend';
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

const LeadModel = schemaImport;
const bodySchema = z.object({
  answers: z.record(z.string(), z.union([z.string(), z.number()]))
});
const _id__post = defineEventHandler(async (event) => {
  var _a, _b;
  setHeader(event, "Access-Control-Allow-Origin", "*");
  setHeader(event, "Access-Control-Allow-Headers", "content-type");
  if (event.method === "OPTIONS") return "";
  const token = ((_a = event.context.params) == null ? void 0 : _a.token) || "";
  const parsed = readQualifyToken(token);
  if (!parsed) {
    throw createError({ statusCode: 401, message: "This link is not valid or has expired." });
  }
  const { answers } = await readValidatedBody(event, bodySchema.parse);
  await connectDB();
  const lead = await LeadModel.findById(parsed.leadId);
  if (!lead) throw createError({ statusCode: 404, message: "We could not find that record." });
  const intent = ((_b = lead == null ? void 0 : lead.qualification) == null ? void 0 : _b.intent) || (lead == null ? void 0 : lead.buy_sell_both) || "buy";
  const now = /* @__PURE__ */ new Date();
  await LeadModel.updateOne({ _id: lead._id }, {
    $set: {
      "qualification.answers": answers,
      "qualification.completedAt": now,
      "qualification.intent": intent
    }
  });
  try {
    const result = await analyseLead(answers, intent, lead.name || "");
    await LeadModel.updateOne({ _id: lead._id }, {
      $set: {
        analysis: {
          readiness: result.scorecard.readiness,
          readinessLabel: result.scorecard.readinessLabel,
          financingRisk: result.scorecard.financingRisk,
          signals: result.scorecard.signals,
          gaps: result.scorecard.gaps,
          read: result.read,
          nextSteps: result.nextSteps,
          source: result.source,
          generatedAt: new Date(result.generatedAt)
        }
      }
    });
  } catch (err) {
    console.error("[qualify] answers saved, analysis failed:", err);
  }
  return { success: true };
});

export { _id__post as default };
//# sourceMappingURL=_id_.post.mjs.map
