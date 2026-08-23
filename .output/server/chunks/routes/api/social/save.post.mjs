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
  platform: z.enum(["facebook", "instagram", "x"]),
  topic: z.string().default("general"),
  body: z.string().min(1),
  hashtags: z.string().optional(),
  imageIdea: z.string().optional(),
  status: z.enum(["draft", "approved"]).default("approved")
});
const save_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const data = await readValidatedBody(event, bodySchema.parse);
  const created = await SocialPost.create({ userId: user._id, ...data });
  return { success: true, _id: String(created._id) };
});

export { save_post as default };
//# sourceMappingURL=save.post.mjs.map
