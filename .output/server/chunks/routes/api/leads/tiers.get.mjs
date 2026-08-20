import { a as defineEventHandler, h as requirePaidUser } from '../../../nitro/nitro.mjs';
import 'mongoose';
import 'resend';
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

const tiers_get = defineEventHandler(async (event) => {
  var _a;
  const user = await requirePaidUser(event);
  const findTiers = (_a = user == null ? void 0 : user.leads) == null ? void 0 : _a.map((item) => {
    const tierOne = item.ai_analysis.includes("Tier 1") || item.ai_analysis.includes("Tier one");
    const tierTwo = item.ai_analysis.includes("Tier 2") || item.ai_analysis.includes("Tier two");
    const tierThree = item.ai_analysis.includes("Tier 3") || item.ai_analysis.includes("Tier three");
    return {
      tierOne,
      tierTwo,
      tierThree
    };
  });
  return {
    totalTiers: findTiers
  };
});

export { tiers_get as default };
//# sourceMappingURL=tiers.get.mjs.map
