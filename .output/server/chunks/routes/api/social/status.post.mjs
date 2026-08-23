import { a as defineEventHandler, b as createError, r as readValidatedBody } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { S as SocialPostModel } from '../../../_/SocialPost.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
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

const SocialPost = SocialPostModel;
const bodySchema = z.object({
  _id: z.string(),
  status: z.enum(["draft", "approved", "posted", "discarded"]),
  body: z.string().optional()
});
const status_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { _id, status, body } = await readValidatedBody(event, bodySchema.parse);
  const update = { status };
  if (typeof body === "string" && body.trim()) update.body = body.trim();
  if (status === "posted") update.postedAt = /* @__PURE__ */ new Date();
  const res = await SocialPost.updateOne({ _id, userId: user._id }, { $set: update });
  if (res.matchedCount === 0) {
    throw createError({ statusCode: 404, message: "Post not found." });
  }
  return { success: true };
});

export { status_post as default };
//# sourceMappingURL=status.post.mjs.map
