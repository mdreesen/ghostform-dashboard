import { a as defineEventHandler, b as createError, c as connectDB, e as setHeader } from '../../../../nitro/nitro.mjs';
import { A as AssetModel } from '../../../../_/Asset.mjs';
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

const Asset = AssetModel;
const _id__get = defineEventHandler(async (event) => {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  if (!id) throw createError({ statusCode: 400, message: "Missing id." });
  await connectDB();
  const asset = await Asset.findOne({ userId: id, kind: "headshot" }).lean();
  if (!(asset == null ? void 0 : asset.data)) {
    throw createError({ statusCode: 404, message: "No headshot." });
  }
  const buffer = Buffer.from(asset.data, "base64");
  setHeader(event, "Content-Type", asset.mime || "image/jpeg");
  setHeader(event, "Content-Length", buffer.length);
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
  return buffer;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
