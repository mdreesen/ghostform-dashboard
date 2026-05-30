import { Model } from 'mongoose';

import loggedInUser from '~/utils/loggedInUser';
import LeadModel from '../../../lib/database/models/Lead';
import type { Lead } from '~/types/lead';

const Lead = LeadModel as Model<Lead>;

import { month } from '~/utils/date';

export default defineEventHandler(async (event) => {
    const user = await loggedInUser(event);


    const leads = await Lead.find({ userId: user?._id })
      .sort({ createdAt: -1 }) // Yields real-time entries newest-first
      .lean();

    const leadByMonth = leads?.map((item: Lead) => {
        const createdDate = item?.date;
        return month(createdDate as string);
    });

    const leadCountsByMonth = leadByMonth?.reduce((accumulator, month) => {
        // Ignore corrupt anomalies or non-standard entries in your data stream
        if (month === 'Invalid Date' || !month) return accumulator

        // If the key doesn't exist yet, initialize it at 0, then increment it
        accumulator[month] = (accumulator[month] || 0) + 1

        return accumulator
    }, {} as Record<string, number>);

const useMonthlyData = Object.entries(leadCountsByMonth ?? {}).map(([month, count]) => {
    return {
        month: month,
        count: count
    }
});

    return {
        monthly: useMonthlyData
    };
});