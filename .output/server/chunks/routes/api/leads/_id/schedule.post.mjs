import { a as defineEventHandler, i as readBody, b as createError, s as schemaImport } from '../../../../nitro/nitro.mjs';
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
const schedule_post = defineEventHandler(async (event) => {
  var _a;
  const leadId = (_a = event.context.params) == null ? void 0 : _a.id;
  const body = await readBody(event);
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session trace expired." });
  }
  const { scheduledTime } = body;
  try {
    const queryFilter = { _id: leadId, userId: user._id };
    if (!scheduledTime) {
      await LeadModel.updateOne(queryFilter, {
        $set: { reminderStatus: "none" },
        $unset: { reminderScheduledAt: "" }
      });
      return { success: true, message: "Automation sequence disabled for this client." };
    }
    await LeadModel.updateOne(queryFilter, {
      $set: {
        reminderStatus: "scheduled",
        reminderScheduledAt: new Date(scheduledTime)
      }
    });
    return { success: true, message: "Custom reminder window logged to pipeline queue." };
  } catch (error) {
    throw createError({ statusCode: 500, message: "Queue allocation transaction aborted." });
  }
});

export { schedule_post as default };
//# sourceMappingURL=schedule.post.mjs.map
