import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../_/loggedInUser.mjs';
import { s as schemaImport } from '../../_/Lead.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';
import '../../_/mongodb.mjs';
import 'mongoose';
import '../../_/User.mjs';

const selection_status_lead = [
  { label: "lead (new)", value: "new" },
  { label: "appointment", value: "appointment" },
  { label: "active", value: "active" },
  { label: "under contract", value: "under contract" },
  { label: "closed", value: "closed" },
  { label: "archive", value: "archive" }
];

const Lead = schemaImport;
const index_get = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  const leads = await Lead.find({ userId: user == null ? void 0 : user._id }).sort({ createdAt: -1 }).lean();
  const findLeadStatus = selection_status_lead.map((item) => {
    const status = item.value;
    const filterLeads = leads == null ? void 0 : leads.filter((lead) => {
      var _a;
      return (_a = lead == null ? void 0 : lead.status) == null ? void 0 : _a.includes(status);
    });
    return { label: item.value, leads: filterLeads };
  });
  return {
    all: leads,
    status: findLeadStatus
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
