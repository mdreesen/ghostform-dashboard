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
  _id: z.string(),
  address: z.string().nullable(),
  age: z.number().nullable(),
  bathrooms: z.number().nullable(),
  bedrooms: z.number().nullable(),
  budget: z.number().nullable(),
  buy_sell_both: z.string().nullable(),
  date: z.string().nullable(),
  email: z.string().nullable(),
  message: z.string().nullable(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  price: z.number().nullable(),
  sqft: z.number().nullable(),
  status: z.string().nullable(),
  want_to_move: z.string().nullable(),
  ai_analysis: z.string().nullable()
});
const index_put = defineEventHandler(async (event) => {
  const { _id, address, age, bathrooms, bedrooms, budget, buy_sell_both, date, email, message, name, phone, price, sqft, status, want_to_move, ai_analysis } = await readValidatedBody(event, bodySchema.parse);
  const obj = {
    _id,
    address,
    age,
    bathrooms,
    bedrooms,
    budget,
    buy_sell_both,
    date,
    email,
    message,
    name,
    phone,
    price,
    sqft,
    status,
    want_to_move,
    ai_analysis
  };
  try {
    await User.findOneAndUpdate(
      { "leads._id": _id },
      { $set: { "leads.$": { ...obj } } }
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
//# sourceMappingURL=index.put.mjs.map
