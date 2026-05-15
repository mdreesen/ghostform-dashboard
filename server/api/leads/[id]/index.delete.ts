import { defineEventHandler, getRouterParam } from 'h3';

import { Model } from 'mongoose';
import UserModel from '../../../../lib/database/models/User';
import { User } from '~/types/user';
const User = UserModel as Model<User>;

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');

    await User.findOneAndUpdate(
      { 'leads._id': id },
      { $pull: { 'leads': { _id: id } } },
      { new: true });

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.'
    });
  }
});