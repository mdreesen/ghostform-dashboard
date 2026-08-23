import { a as defineEventHandler, b as createError, r as readValidatedBody, U as UserModelImport } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
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

const User = UserModelImport;
const bodySchema = z.object({
  tone: z.enum(["warm", "straight", "playful", "polished"]).optional(),
  about: z.string().max(500).optional(),
  focus: z.string().max(300).optional(),
  emoji: z.enum(["none", "some", "lots"]).optional(),
  hashtags: z.enum(["none", "few", "many"]).optional(),
  phrases: z.string().max(400).optional(),
  avoid: z.string().max(400).optional(),
  samples: z.string().max(4e3).optional()
});
const voice_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const voice = await readValidatedBody(event, bodySchema.parse);
  await User.updateOne(
    { _id: user._id },
    { $set: Object.fromEntries(Object.entries(voice).map(([k, v]) => [`voice.${k}`, v])) }
  );
  return { success: true };
});

export { voice_post as default };
//# sourceMappingURL=voice.post.mjs.map
