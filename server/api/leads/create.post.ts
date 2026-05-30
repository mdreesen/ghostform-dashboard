import { z } from 'zod';

import { Model } from 'mongoose';
import LeadModel from '../../../lib/database/models/Lead';
import loggedInUser from '~/utils/loggedInUser';
import type { Lead } from '~/types/lead';

const Lead = LeadModel as Model<Lead>;

const bodySchema = z.object({
  source: z.string().nullable(),
  name: z.string().nullable(),
  age: z.number().nullable(),
  email: z.string().nullable(),
  phone: z.number().nullable(),
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
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const user = await loggedInUser(event);

  try {
    await Lead.create({ userId: user?._id, ...body });
  } catch (error: any) {
    console.error('Something went wrong', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Database execution fault.'
    })
  }
})
