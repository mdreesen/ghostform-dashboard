import { z } from 'zod';
import type { Model } from 'mongoose';
import SocialModel from '../../../lib/database/models/SocialPost';

const Social = SocialModel as Model<any>

const bodySchema = z.object({
  _id: z.string(),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, bodySchema.parse);

    await Social.deleteOne({ _id: body._id });

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.'
    });
  }
});