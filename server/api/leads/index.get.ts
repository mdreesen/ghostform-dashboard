import loggedInUser from '~/utils/loggedInUser';
import { selection_status_lead } from '~/utils/dropdowns/selections';
import type { Lead } from '~/types/lead';

export default defineEventHandler(async (event) => {
    const user = await loggedInUser(event);

    const findLeadStatus = selection_status_lead.map((item) => {
      const status = item.value;
      const filterLeads = user?.leads.filter((lead: Lead) => lead.status.includes(status))

      return { label: item.value, leads: filterLeads }
    });

    return {
      all: user?.leads.reverse(),
      status: findLeadStatus
    };
  });