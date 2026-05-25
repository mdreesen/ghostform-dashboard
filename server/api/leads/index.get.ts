import loggedInUser from '~/utils/loggedInUser';

export default defineEventHandler(async (event) => {
    const user = await loggedInUser(event);

    const status_new = user?.leads.filter((item) => item.status.includes('new'));
    const status_active = user?.leads.filter((item) => item.status.includes('active'));

    return {
      all: user?.leads?.reverse(),
      new: status_new,
      active: status_active
    }
  });