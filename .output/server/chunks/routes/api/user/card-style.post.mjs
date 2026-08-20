import { a as defineEventHandler, b as createError, r as readValidatedBody, U as UserModelImport } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
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

const User = UserModelImport;
const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/);
const bodySchema = z.object({
  theme: z.enum(["light", "dark", "accent", "custom"]).optional(),
  bg: hex.optional(),
  fg: hex.optional(),
  accent: hex.optional(),
  showAvatar: z.boolean().optional(),
  showBar: z.boolean().optional(),
  ratio: z.enum(["square", "story", "landscape"]).optional()
});
const cardStyle_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const style = await readValidatedBody(event, bodySchema.parse);
  await User.updateOne(
    { _id: user._id },
    { $set: Object.fromEntries(Object.entries(style).map(([k, v]) => [`cardStyle.${k}`, v])) }
  );
  return { success: true };
});

export { cardStyle_post as default };
//# sourceMappingURL=card-style.post.mjs.map
