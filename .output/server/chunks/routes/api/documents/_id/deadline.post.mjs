import { a as defineEventHandler, b as createError, r as readValidatedBody } from '../../../../nitro/nitro.mjs';
import { z } from 'zod';
import { D as DocumentModel } from '../../../../_/Document.mjs';
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

const Doc = DocumentModel;
const bodySchema = z.object({
  deadlineId: z.string(),
  action: z.enum(["confirm", "dismiss", "complete", "reopen"]),
  // Corrections — the realtor may fix a misread date or reprioritise.
  date: z.string().optional(),
  label: z.string().max(120).optional(),
  priority: z.enum(["high", "medium", "low"]).optional()
});
const deadline_post = defineEventHandler(async (event) => {
  var _a;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { deadlineId, action, date, label, priority } = await readValidatedBody(event, bodySchema.parse);
  const set = {};
  if (action === "confirm") set["deadlines.$.confirmed"] = true;
  if (action === "dismiss") set["deadlines.$.dismissed"] = true;
  if (action === "complete") {
    set["deadlines.$.completed"] = true;
    set["deadlines.$.completedAt"] = /* @__PURE__ */ new Date();
  }
  if (action === "reopen") {
    set["deadlines.$.completed"] = false;
    set["deadlines.$.completedAt"] = null;
  }
  if (date && !Number.isNaN(Date.parse(date))) {
    set["deadlines.$.date"] = new Date(date);
    set["deadlines.$.confirmed"] = true;
  }
  if (label) set["deadlines.$.label"] = label;
  if (priority) set["deadlines.$.priority"] = priority;
  const res = await Doc.updateOne(
    { _id: (_a = event.context.params) == null ? void 0 : _a.id, userId: user._id, "deadlines._id": deadlineId },
    { $set: set }
  );
  if (res.matchedCount === 0) throw createError({ statusCode: 404, message: "Not found." });
  return { success: true };
});

export { deadline_post as default };
//# sourceMappingURL=deadline.post.mjs.map
