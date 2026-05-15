import { z } from 'zod';

import { Model } from 'mongoose';
import UserModel from '../../../../lib/database/models/User';
import { User } from '~/types/user';
const User = UserModel as Model<User>;

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
    ai_analysis: z.string().nullable(),
})

export default defineEventHandler(async (event) => {
  const { _id, address, age, bathrooms, bedrooms, budget, buy_sell_both, date, email, message, name, phone, price, sqft, status, want_to_move, ai_analysis } = await readValidatedBody(event, bodySchema.parse);

  const obj = {
    _id: _id,
    address: address,
    age: age,
    bathrooms: bathrooms,
    bedrooms: bedrooms,
    budget: budget,
    buy_sell_both: buy_sell_both,
    date: date,
    email: email,
    message: message,
    name: name,
    phone: phone,
    price: price,
    sqft: sqft,
    status: status,
    want_to_move: want_to_move,
    ai_analysis: ai_analysis
  };

  try {
    await User.findOneAndUpdate(
      { 'leads._id': _id },
      { $set: { 'leads.$': { ...obj } } });

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: 'Please try again'
    });
  };
});
