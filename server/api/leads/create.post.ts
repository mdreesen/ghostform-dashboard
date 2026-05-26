import { z } from 'zod';

import { Model } from 'mongoose';
import UserModel from '../../../lib/database/models/User';
import { User } from '~/types/user';
import loggedInUser from '~/utils/loggedInUser';

const User = UserModel as Model<User>;

const bodySchema = z.object({
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
    seeing_an_agent: z.string().nullable(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const user = await loggedInUser(event);

//   const obj = {
//     address: address,
//     age: age,
//     bathrooms: bathrooms,
//     bedrooms: bedrooms,
//     budget: budget,
//     buy_sell_both: buy_sell_both,
//     date: date,
//     email: email,
//     notes: notes,
//     name: name,
//     phone: phone,
//     price: price,
//     sqft: sqft,
//     status: status,
//     want_to_move: want_to_move,
//   };

  try {
    await User.findOneAndUpdate(
      { email: user?.email },
      { $set: { 'leads.$': body } });

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: 'Please try again'
    });
  };
});
