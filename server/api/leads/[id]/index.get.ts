import { Model } from 'mongoose';

import LeadModel from '../../../../lib/database/models/Lead';
import type { Lead } from '~/types/lead';

const Lead = LeadModel as Model<Lead>;
import { defineEventHandler, getRouterParam } from 'h3';
import loggedInUser from '~/utils/loggedInUser';
import { isObjectId } from '~/utils/objectId'

export default defineEventHandler(async (event) => {
  try {
    // Scoped to the owner. Without userId in the query, anyone who knows a
    // lead id could read another realtor's client — name, phone, budget.
    const user = await loggedInUser(event);
    if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' });

  const routeId = event.context.params?.id
  if (!isObjectId(routeId)) {
    throw createError({ statusCode: 400, message: 'That link is missing an id.' })
  }

    const id = getRouterParam(event, 'id');
    const data = await Lead.findOne({ _id: id, userId: user._id }).lean();
    if (!data) throw createError({ statusCode: 404, message: 'Lead not found.' });

    return data;

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.'
    });
  }
});