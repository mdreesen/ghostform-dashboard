import { a as defineEventHandler, b as createError, z as readRawBody } from '../../../../nitro/nitro.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, normalize, dirname } from 'node:path';
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

const ____key__put = defineEventHandler(async (event) => {
  var _a;
  if (hasR2()) throw createError({ statusCode: 404, message: "Not found." });
  const key = (((_a = event.context.params) == null ? void 0 : _a.key) || "").split("/").filter(Boolean).join("/");
  const root = join(process.cwd(), ".data", "uploads");
  const target = normalize(join(root, key));
  if (!target.startsWith(root)) {
    throw createError({ statusCode: 400, message: "Invalid key." });
  }
  const body = await readRawBody(event, false);
  if (!body) throw createError({ statusCode: 400, message: "Empty upload." });
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, body);
  return { success: true };
});

export { ____key__put as default };
//# sourceMappingURL=_...key_.put.mjs.map
