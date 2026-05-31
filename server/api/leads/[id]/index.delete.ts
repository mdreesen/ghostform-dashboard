import { z } from 'zod';

import { Model } from 'mongoose';
import LeadModel from '../../../../lib/database/models/Lead';
import type { Lead } from '~/types/lead';

const Lead = LeadModel as Model<Lead>;

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');

    await Lead.deleteOne({ _id: id });


  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.'
    });
  }
});