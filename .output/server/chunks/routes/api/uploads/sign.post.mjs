import { a as defineEventHandler, b as createError, r as readValidatedBody } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { b as buildKey, p as presignUpload } from '../../../_/storage.mjs';
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
import '@aws-sdk/client-s3';
import '@aws-sdk/s3-request-presigner';

const bodySchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
  bytes: z.number().int().positive(),
  /** 'document' for contracts, 'brand' for logos/headshots. */
  scope: z.enum(["document", "brand"]).default("document")
});
const MAX_BYTES = 25 * 1024 * 1024;
const ALLOWED = /* @__PURE__ */ new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif"
]);
const sign_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { filename, contentType, bytes, scope } = await readValidatedBody(event, bodySchema.parse);
  if (!ALLOWED.has(contentType)) {
    throw createError({
      statusCode: 400,
      message: "Upload a PDF or an image. Word documents need exporting to PDF first."
    });
  }
  if (bytes > MAX_BYTES) {
    throw createError({ statusCode: 413, message: "That file is larger than 25MB." });
  }
  const key = buildKey(String(user._id), scope, filename);
  const uploadUrl = await presignUpload(key, contentType);
  return { uploadUrl, key };
});

export { sign_post as default };
//# sourceMappingURL=sign.post.mjs.map
