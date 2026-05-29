import loggedInUser from '~/utils/loggedInUser';
import type { Lead } from '~/types/lead';
import { month } from '~/utils/date';

export default defineEventHandler(async (event) => {
    const user = await loggedInUser(event);

    const leadByMonth = user?.leads.map((item: Lead) => {
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