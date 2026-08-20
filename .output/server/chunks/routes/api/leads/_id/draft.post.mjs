import { a as defineEventHandler, b as createError, j as readBody, s as schemaImport, m as generateLeadDraft } from '../../../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../../../_/loggedInUser.mjs';
import 'mongoose';
import 'openai';
import 'resend';
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
const draft_post = defineEventHandler(async (event) => {
  var _a;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session expired." });
  }
  const body = await readBody(event).catch(() => ({}));
  const channel = (body == null ? void 0 : body.channel) === "email" ? "email" : "sms";
  const lead = await LeadModel.findOne({ _id: leadId, userId: user._id }).lean();
  if (!lead) {
    throw createError({ statusCode: 404, message: "Lead not found." });
  }
  const draft = await generateLeadDraft(
    {
      name: lead.name,
      budget: lead.budget,
      price: lead.price,
      want_to_move: lead.want_to_move,
      buy_sell_both: lead.buy_sell_both,
      bedrooms: lead.bedrooms,
      address: lead.address,
      status: lead.status,
      lastContactedAt: lead.lastContactedAt,
      agentName: user.name || user.company || "Your agent"
    },
    channel
  );
  return { channel, ...draft };
});

export { draft_post as default };
//# sourceMappingURL=draft.post.mjs.map
