import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
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
import '../../../_/mongodb.mjs';
import 'mongoose';
import '../../../_/User.mjs';
import 'zod';

const tiers_get = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  const findTiers = user == null ? void 0 : user.leads.map((item) => {
    const tierOne = item.ai_analysis.includes("Tier 1") || item.ai_analysis.includes("Tier one");
    const tierTwo = item.ai_analysis.includes("Tier 2") || item.ai_analysis.includes("Tier two");
    const tierThree = item.ai_analysis.includes("Tier 3") || item.ai_analysis.includes("Tier three");
    return {
      tierOne,
      tierTwo,
      tierThree
    };
  });
  console.log(findTiers);
  return {
    totalTiers: findTiers
  };
});

export { tiers_get as default };
//# sourceMappingURL=tiers.get.mjs.map
