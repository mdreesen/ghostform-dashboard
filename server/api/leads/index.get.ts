import loggedInUser from '~/utils/loggedInUser';
import { latestData } from '~/utils/formatters/latestData';

export default defineEventHandler(async (event) => {
    const user = await loggedInUser(event);

    return user?.leads?.reverse();
  });