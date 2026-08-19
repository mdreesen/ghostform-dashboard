import type { Model } from 'mongoose'
import CampaignModel from '../../../lib/database/models/Campaign';
import requirePaidUser from '~~/server/utils/requirePaidUser';

const Campaign = CampaignModel as Model<any>

export default defineEventHandler(async (event) => {
    const user = await requirePaidUser(event); // gated: active subscription required

    const data = await Campaign.find({ userId: user?._id })
      .sort({ createdAt: -1 }) // Yields real-time entries newest-first
      .lean();

    return data;
  });