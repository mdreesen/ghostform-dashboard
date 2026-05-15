import loggedInUser from '~/utils/loggedInUser';
import type { Lead } from '~/types/lead';

export default defineEventHandler(async (event) => {
    const user = await loggedInUser(event);

    const findNew = user?.leads.filter((item: Lead) => item.status.includes('new'));
    const findActive = user?.leads.filter((item: Lead) => item.status.includes('active'));

    return {
        allStatus: {
            new: findNew,
            active: findActive
        }
    }
  });