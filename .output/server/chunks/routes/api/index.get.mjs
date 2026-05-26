import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../_/loggedInUser.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jose';
import '@iconify/utils';
import 'consola';
import 'ipx';
import '../../_/mongodb.mjs';
import 'mongoose';
import '../../_/User.mjs';
import 'zod';

const selection_status_lead = [
  { label: "lead (new)", value: "new" },
  { label: "appointment", value: "appointment" },
  { label: "active", value: "active" },
  { label: "under contract", value: "under contract" },
  { label: "closed", value: "closed" },
  { label: "archive", value: "archive" }
];

const index_get = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  const findLeadStatus = selection_status_lead.map((item) => {
    const status = item.value;
    const filterLeads = user == null ? void 0 : user.leads.filter((lead) => lead.status.includes(status));
    return { label: item.value, leads: filterLeads };
  });
  return {
    all: user == null ? void 0 : user.leads.reverse(),
    status: findLeadStatus
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
