import { z } from 'zod';

import { Model } from 'mongoose';
import UserModel from '../../../../lib/database/models/User';
import { User } from '~/types/user';
const User = UserModel as Model<User>;

const bodySchema = z.object({
  _id: z.string().nullable(),
  title: z.string().nullable(),
  setting: z.string().nullable(),
  value: z.boolean()
})

export default defineEventHandler(async (event) => {
  const { _id, title, setting, value } = await readValidatedBody(event, bodySchema.parse);

  try {

    const obj = {
      _id: _id,
      title: title,
      setting: setting,
      value: value
    };

    await User.findOneAndUpdate(
      { 'settings._id': _id },
      { $set: { 'settings.$': obj } },
      { new: true });

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: 'Please try again'
    });
  };
});
