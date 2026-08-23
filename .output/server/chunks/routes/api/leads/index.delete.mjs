import { a as defineEventHandler, p as getRouterParam, s as schemaImport, b as createError } from '../../../nitro/nitro.mjs';
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

const Lead = schemaImport;
const index_delete = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    await Lead.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

export { index_delete as default };
//# sourceMappingURL=index.delete.mjs.map
