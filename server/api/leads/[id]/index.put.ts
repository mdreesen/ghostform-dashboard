import { z } from 'zod';

import { Model } from 'mongoose';
import LeadModel from '../../../../lib/database/models/Lead';
import type { Lead } from '~/types/lead';

const Lead = LeadModel as Model<Lead>;

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
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  try {
      // Detect a status change: it counts as making contact, so we stamp
      // lastContactedAt (which drops the lead off the daily briefing until it
      // goes cold again). Only status changes trigger this - editing notes or
      // other fields does not.
      const existing = await Lead.findById(body._id).select('status').lean() as { status?: string } | null;
      const statusChanged =
        !!body.status && existing?.status !== body.status;

      const update: Record<string, any> = { ...body };
      if (statusChanged) {
        update.lastContactedAt = new Date();
        update.$inc = { contactCount: 1 };
      }

      // Split $set fields from $inc so both apply cleanly in one call.
      const { $inc, ...setFields } = update;
      const mongoUpdate: Record<string, any> = { $set: setFields };
      if ($inc) mongoUpdate.$inc = $inc;

      await Lead.findOneAndUpdate(
        { _id: body._id },
        mongoUpdate,
        { new: true });

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: 'Please try again'
    });
  };
});
