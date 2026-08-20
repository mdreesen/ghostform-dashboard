import { a as defineEventHandler, b as createError, s as schemaImport } from '../../../../nitro/nitro.mjs';
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
const contacted_post = defineEventHandler(async (event) => {
  var _a;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session expired." });
  }
  try {
    const now = /* @__PURE__ */ new Date();
    const result = await LeadModel.updateOne(
      { _id: leadId, userId: user._id },
      // scoped so a realtor can only touch their own leads
      {
        $set: { lastContactedAt: now, reminderStatus: "none" },
        $inc: { contactCount: 1 },
        $unset: { reminderScheduledAt: "" }
      }
    );
    if (result.matchedCount === 0) {
      throw createError({ statusCode: 404, message: "Lead not found." });
    }
    return { success: true, lastContactedAt: now.toISOString() };
  } catch (error) {
    if (error == null ? void 0 : error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Could not update contact status." });
  }
});

export { contacted_post as default };
//# sourceMappingURL=contacted.post.mjs.map
