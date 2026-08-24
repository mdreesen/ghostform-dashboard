import { a as defineEventHandler, b as createError, s as schemaImport, m as analyseLead } from '../../../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../../../_/loggedInUser.mjs';
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
const analyse_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const lead = await LeadModel.findOne({ _id: leadId }).lean();
  if (!lead) throw createError({ statusCode: 404, message: "Lead not found." });
  const answers = (_c = (_b = lead == null ? void 0 : lead.qualification) == null ? void 0 : _b.answers) != null ? _c : {};
  const answered = Object.values(answers).filter((v) => String(v != null ? v : "").trim()).length;
  if (answered < 4) {
    throw createError({
      statusCode: 400,
      message: "Not enough information yet. Send the questionnaire first \u2014 analysis needs real answers to be worth anything."
    });
  }
  const intent = ((_d = lead == null ? void 0 : lead.qualification) == null ? void 0 : _d.intent) || (lead == null ? void 0 : lead.buy_sell_both) || "buy";
  const result = await analyseLead(answers, intent, (lead == null ? void 0 : lead.name) || "");
  await LeadModel.findOneAndUpdate({ _id: leadId }, { ai_analysis: result });
  return result;
});

export { analyse_post as default };
//# sourceMappingURL=analyse.post.mjs.map
