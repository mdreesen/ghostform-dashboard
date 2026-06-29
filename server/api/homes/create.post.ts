import { z } from 'zod';

import { Model } from 'mongoose';
import HomeModel from '../../../lib/database/models/Home';
import loggedInUser from '~/utils/loggedInUser';
import type { Home } from '~/types/home';

const Lead = HomeModel as Model<Home>;

const bodySchema = z.object({
  name: z.string().nullable(),
  address: z.string().nullable(),
  owner: z.string().nullable(),
  notes: z.string().nullable(),
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
