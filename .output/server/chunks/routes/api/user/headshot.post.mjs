import { a as defineEventHandler, b as createError, r as readValidatedBody, U as UserModelImport } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { A as AssetModel } from '../../../_/Asset.mjs';
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

const Asset = AssetModel;
const User = UserModelImport;
const MAX_BASE64 = 4e5;
const bodySchema = z.object({
  // data URL from the client-side canvas compressor
  image: z.string().min(50),
  width: z.number().optional(),
  height: z.number().optional()
});
const headshot_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { image, width, height } = await readValidatedBody(event, bodySchema.parse);
  const match = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(image);
  if (!match) {
    throw createError({
      statusCode: 400,
      message: "Unsupported image. Use a JPEG, PNG or WebP."
    });
  }
  const [, mime, data] = match;
  if (data.length > MAX_BASE64) {
    throw createError({
      statusCode: 413,
      message: "That image is too large even after compression. Try a smaller one."
    });
  }
  await Asset.findOneAndUpdate(
    { userId: user._id, kind: "headshot" },
    {
      userId: user._id,
      kind: "headshot",
      mime,
      data,
      bytes: Math.round(data.length * 0.75),
      width: width != null ? width : 0,
      height: height != null ? height : 0
    },
    { upsert: true, new: true }
  );
  const url = `/api/assets/headshot/${String(user._id)}?v=${Date.now()}`;
  await User.updateOne({ _id: user._id }, { $set: { headshot_url: url } });
  return { success: true, url };
});

export { headshot_post as default };
//# sourceMappingURL=headshot.post.mjs.map
