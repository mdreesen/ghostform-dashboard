import { z } from 'zod';

import { Model } from 'mongoose';
import HomeModel from '../../../lib/database/models/Home';
import loggedInUser from '~/utils/loggedInUser';
import type { Home } from '~/types/home';

const Lead = HomeModel as Model<Home>;

const bodySchema = z.object({
  name: z.string().nullish(),
  // The address is the only field that genuinely matters — it's what gets
  // attached to a captured lead so the realtor knows which listing it came from.
  address: z.string().min(1, 'An address is required.'),
  owner: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.enum(['active', 'pending', 'sold']).optional(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const user = await loggedInUser(event);

  try {
    const created = await Lead.create({ userId: user?._id, ...body });
    return { success: true, _id: String(created._id) };
  } catch (error: any) {
    console.error('Something went wrong', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Database execution fault.'
    })
  }
})
