import { a as defineEventHandler, b as createError, e as setHeader } from '../../../../nitro/nitro.mjs';
import { readFile } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { h as hasR2 } from '../../../../_/storage.mjs';
import 'mongoose';
import 'node:crypto';
import 'openai';
import 'resend';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';
import '@aws-sdk/client-s3';
import '@aws-sdk/s3-request-presigner';

const MIME = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
  ".heif": "image/heif"
};
const ____key__get = defineEventHandler(async (event) => {
  var _a;
  if (hasR2()) throw createError({ statusCode: 404, message: "Not found." });
  const key = (((_a = event.context.params) == null ? void 0 : _a.key) || "").split("/").filter(Boolean).join("/");
  const root = join(process.cwd(), ".data", "uploads");
  const target = normalize(join(root, key));
  if (!target.startsWith(root)) throw createError({ statusCode: 400, message: "Invalid key." });
  try {
    const buf = await readFile(target);
    setHeader(event, "Content-Type", MIME[extname(target).toLowerCase()] || "application/octet-stream");
    setHeader(event, "Cache-Control", "private, max-age=3600");
    return buf;
  } catch {
    throw createError({ statusCode: 404, message: "File not found." });
  }
});

export { ____key__get as default };
//# sourceMappingURL=_...key_.get.mjs.map
