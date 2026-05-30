import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
import { L as LeadModel } from '../../../_/Lead.mjs';
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
import '../../../_/mongodb.mjs';
import 'mongoose';
import '../../../_/User.mjs';

function month(date2) {
  const dateObj = new Date(date2);
  return dateObj.toLocaleString("default", { month: "long" });
}

const Lead = LeadModel;
const lead_get = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  const leads = await Lead.find({ userId: user == null ? void 0 : user._id }).lean();
  const leadByMonth = leads == null ? void 0 : leads.map((item) => {
    const createdDate = item == null ? void 0 : item.date;
    return month(createdDate);
  });
  const leadCountsByMonth = leadByMonth == null ? void 0 : leadByMonth.reduce((acc, month2) => {
    if (month2 === "Invalid Date" || !month2) return acc;
    acc[month2] = (acc[month2] || 0) + 1;
    return acc;
  }, {});
  const useMonthlyData = Object.entries(leadCountsByMonth != null ? leadCountsByMonth : {}).map(([month2, count]) => {
    return {
      month: month2,
      count
    };
  });
  return {
    monthly: useMonthlyData
  };
});

export { lead_get as default };
//# sourceMappingURL=lead.get.mjs.map
