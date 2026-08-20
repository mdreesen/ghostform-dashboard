import { a as defineEventHandler, m as getRouterParam, s as schemaImport, b as createError } from '../../../nitro/nitro.mjs';
import 'mongoose';
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

const Lead = schemaImport;
const index_get = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const data = await Lead.findById(id).lean();
    return data;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
