import { z } from 'zod';
import type { Model } from 'mongoose';
import CampaignModel from '../../../lib/database/models/Campaign';

const Campaign = CampaignModel as Model<any>

const bodySchema = z.object({
  _id: z.string(),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, bodySchema.parse);

    await Campaign.deleteOne({ _id: body._id });

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.'
    });
  }
});