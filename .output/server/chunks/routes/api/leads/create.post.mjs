import { d as defineEventHandler, r as readValidatedBody, c as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { U as User$1 } from '../../../_/User.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
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
import '../../../_/mongodb.mjs';

const User = User$1;
const bodySchema = z.object({
  // address: z.string().nullable(),
  // age: z.number().nullable(),
  // bathrooms: z.number().nullable(),
  // bedrooms: z.number().nullable(),
  // budget: z.number().nullable(),
  // buy_sell_both: z.string().nullable(),
  // date: z.string().nullable(),
  // email: z.string().nullable(),
  // message: z.string().nullable(),
  // name: z.string().nullable(),
  // phone: z.string().nullable(),
  // price: z.number().nullable(),
  // sqft: z.number().nullable(),
  // status: z.string().nullable(),
  // want_to_move: z.string().nullable(),
  // ai_analysis: z.string().nullable(),
  source: z.string().nullable(),
  name: z.string().nullable(),
  age: z.string().nullable(),
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
    await User.findOneAndUpdate(
      { email: user == null ? void 0 : user.email },
      { $set: { "leads.$": body } }
    );
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: "Please try again"
    });
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
