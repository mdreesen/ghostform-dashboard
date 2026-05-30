import { Model } from 'mongoose';

import loggedInUser from '~/utils/loggedInUser';
import { selection_status_lead } from '~/utils/dropdowns/selections';
import LeadModel from '../../../lib/database/models/Lead';
import type { Lead } from '~/types/lead';

const Lead = LeadModel as Model<Lead>;

export default defineEventHandler(async (event) => {
    const user = await loggedInUser(event);

    const leads = await Lead.find({ userId: user?._id })
      .sort({ createdAt: -1 }) // Yields real-time entries newest-first
      .lean();

    const findLeadStatus = selection_status_lead.map((item) => {
      const status = item.value;
      const filterLeads = leads?.filter((lead: Lead) => lead?.status?.includes(status));

      return { label: item.value, leads: filterLeads }
    });

    return {
      all: leads,
      status: findLeadStatus
    };
  });