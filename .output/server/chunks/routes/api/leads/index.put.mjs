import { a as defineEventHandler, r as readValidatedBody, s as schemaImport, b as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import 'mongoose';
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
    const existing = await Lead.findById(body._id).select("status").lean();
    const statusChanged = !!body.status && (existing == null ? void 0 : existing.status) !== body.status;
    const update = { ...body };
    if (statusChanged) {
      update.lastContactedAt = /* @__PURE__ */ new Date();
      update.$inc = { contactCount: 1 };
    }
    const { $inc, ...setFields } = update;
    const mongoUpdate = { $set: setFields };
    if ($inc) mongoUpdate.$inc = $inc;
    await Lead.findOneAndUpdate(
      { _id: body._id },
      mongoUpdate,
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
