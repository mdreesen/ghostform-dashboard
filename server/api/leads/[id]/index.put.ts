import { z } from 'zod';

import { Model } from 'mongoose';
import UserModel from '../../../../lib/database/models/User';
import { User } from '~/types/user';
const User = UserModel as Model<User>;

const bodySchema = z.object({
    _id: z.string(),
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
    ai_analysis: z.string().nullable()
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  try {
    await User.findOneAndUpdate(
      { 'leads._id': body._id },
      { $set: { 'leads.$': { ...body } } });

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: 'Please try again'
    });
  };
});
