import { z } from 'zod';

import { Model } from 'mongoose';
import LeadModel from '../../../../lib/database/models/Lead';
import type { Lead } from '~/types/lead';

import loggedInUser from '~/utils/loggedInUser';
import { isObjectId } from '~/utils/objectId'

const Lead = LeadModel as Model<Lead>;

export default defineEventHandler(async (event) => {
  try {
    const user = await loggedInUser(event);
    if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' });

  const routeId = event.context.params?.id
  if (!isObjectId(routeId)) {
    throw createError({ statusCode: 400, message: 'That link is missing an id.' })
  }

    const id = getRouterParam(event, 'id');

    // userId in the FILTER, not just checked beforehand — a delete that
    // matches nothing is far better than one that deletes someone else's lead.
    const res = await Lead.deleteOne({ _id: id, userId: user._id });
    if (res.deletedCount === 0) throw createError({ statusCode: 404, message: 'Lead not found.' });


  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.'
    });
  }
});