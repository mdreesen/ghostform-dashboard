import { a as defineEventHandler, r as readValidatedBody, s as schemaImport, b as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
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
const bodySchema = z.object({
  source: z.string().nullable(),
  name: z.string().nullable(),
  age: z.number().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  date: z.string().nullable(),
  status: z.string().nullable(),
  best_communication_method: z.string().nullable(),
  address: z.string().nullable(),
  want_to_move: z.string().nullable(),
  buy_sell_both: z.string().nullable(),
  price: z.number().nullable(),
  sqft: z.number().nullable(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  budget: z.number().nullable(),
  notes: z.string().nullable(),
  seeing_an_agent: z.string().nullable()
});
const create_post = defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const user = await loggedInUser(event);
  try {
    await Lead.create({ userId: user == null ? void 0 : user._id, ...body });
  } catch (error) {
    console.error("Something went wrong", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Database execution fault."
    });
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
