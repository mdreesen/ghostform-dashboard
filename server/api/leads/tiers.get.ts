import loggedInUser from '~/utils/loggedInUser';
// import { latestData } from '~/utils/formatters/latestData';
import type { Lead } from '~/types/lead';

export default defineEventHandler(async (event) => {
    const user = await loggedInUser(event);

    const findTiers = user?.leads.map((item: Lead) => {
        const tierOne = item.ai_analysis.includes('Tier 1') || item.ai_analysis.includes('Tier one');
        const tierTwo = item.ai_analysis.includes('Tier 2') || item.ai_analysis.includes('Tier two');
        const tierThree = item.ai_analysis.includes('Tier 3') || item.ai_analysis.includes('Tier three');

        return {
            tierOne: tierOne,
            tierTwo: tierTwo,
            tierThree: tierThree
        }
    });

    console.log(findTiers)
    return {
        totalTiers: findTiers
    }
  });