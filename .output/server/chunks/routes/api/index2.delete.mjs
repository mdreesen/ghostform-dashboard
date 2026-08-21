import { a as defineEventHandler, r as readValidatedBody, b as createError } from '../../nitro/nitro.mjs';
import { z } from 'zod';
import { S as SocialPostModel } from '../../_/SocialPost.mjs';
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

const Social = SocialPostModel;
const bodySchema = z.object({
  _id: z.string()
});
const index_delete = defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, bodySchema.parse);
    await Social.deleteOne({ _id: body._id });
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

export { index_delete as default };
//# sourceMappingURL=index2.delete.mjs.map
