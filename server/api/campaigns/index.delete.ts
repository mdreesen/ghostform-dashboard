import { z } from 'zod';
import type { Model } from 'mongoose';
import CampaignModel from '../../../lib/database/models/Campaign';

import loggedInUser from '~/utils/loggedInUser';

const Campaign = CampaignModel as Model<any>

const bodySchema = z.object({
  _id: z.string(),
})

export default defineEventHandler(async (event) => {
  try {
    const user = await loggedInUser(event);
    if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' });

    const body = await readValidatedBody(event, bodySchema.parse);

    await Campaign.deleteOne({ _id: body._id, userId: user._id });

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.'
    });
  }
});