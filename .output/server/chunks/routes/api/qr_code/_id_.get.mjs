import { d as defineEventHandler, g as getRouterParam, a as setResponseHeader, c as createError } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jose';
import '@iconify/utils';
import 'consola';
import 'ipx';

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const scanUrl = `https://ghostform.com/capture?ref=${id}`;
  const QRCode = require("qrcode");
  try {
    const pngBuffer = await QRCode.toBuffer(scanUrl, {
      color: {
        dark: "#30cf43",
        // Ghost Green
        light: "#0a0a0c",
        // Ghost Dark
        margin: 2
      }
    });
    setResponseHeader(event, "Content-Type", "image/png");
    return pngBuffer;
  } catch (err) {
    throw createError({ statusCode: 500, message: "QR Generation Failed" });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
