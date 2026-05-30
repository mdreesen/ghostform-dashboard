import { d as defineEventHandler, r as readValidatedBody, c as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { L as LeadModel } from '../../../_/Lead.mjs';
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
import 'mongoose';

const Lead = LeadModel;
const bodySchema = z.object({
  _id: z.string(),
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
  seeing_an_agent: z.string().nullable(),
  ai_analysis: z.string().nullable()
});
const index_put = defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  try {
    await Lead.findOneAndUpdate(
      { _id: body._id },
      { ...body },
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
//# sourceMappingURL=index.put.mjs.map
