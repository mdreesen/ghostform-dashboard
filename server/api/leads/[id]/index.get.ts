import { Model } from 'mongoose';

import LeadModel from '../../../../lib/database/models/Lead';
import type { Lead } from '~/types/lead';

const Lead = LeadModel as Model<Lead>;
import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');

    const data = await Lead.findById(id).lean();

    return data;

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.'
    });
  }
});