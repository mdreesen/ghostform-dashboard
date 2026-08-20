import { a as defineEventHandler, i as requirePaidUser } from '../../nitro/nitro.mjs';
import { C as CampaignModelImport } from '../../_/Campaign.mjs';
import 'mongoose';
import 'openai';
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

const Campaign = CampaignModelImport;
const index_get = defineEventHandler(async (event) => {
  const user = await requirePaidUser(event);
  const data = await Campaign.find({ userId: user == null ? void 0 : user._id }).sort({ createdAt: -1 }).lean();
  return data;
});

export { index_get as default };
//# sourceMappingURL=index2.get.mjs.map
