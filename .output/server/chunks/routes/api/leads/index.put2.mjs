import { d as defineEventHandler, r as readValidatedBody, c as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { U as User$1 } from '../../../_/User.mjs';
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
import 'mongoose';

const User = User$1;
const bodySchema = z.object({
  _id: z.string().nullable(),
  title: z.string().nullable(),
  setting: z.string().nullable(),
  value: z.boolean()
});
const index_put = defineEventHandler(async (event) => {
  const { _id, title, setting, value } = await readValidatedBody(event, bodySchema.parse);
  try {
    const obj = {
      _id,
      title,
      setting,
      value
    };
    await User.findOneAndUpdate(
      { "settings._id": _id },
      { $set: { "settings.$": obj } },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

export { index_put as default };
//# sourceMappingURL=index.put2.mjs.map
