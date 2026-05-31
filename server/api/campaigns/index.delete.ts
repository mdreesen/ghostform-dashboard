import type { Model } from 'mongoose'
import CampaignModel from '../../../lib/database/models/Campaign';
import loggedInUser from '~/utils/loggedInUser'

const Campaign = CampaignModel as Model<any>

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');

    await Campaign.deleteOne({ _id: id });


  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.'
    });
  }
});