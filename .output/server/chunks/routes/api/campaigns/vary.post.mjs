import { a as defineEventHandler, b as createError, r as readValidatedBody } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { C as CampaignModelImport } from '../../../_/Campaign.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
import 'mongoose';
import 'node:crypto';
import 'openai';
import 'resend';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';

const Campaign = CampaignModelImport;
const bodySchema = z.object({
  _id: z.string(),
  varyWording: z.boolean()
});
const vary_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { _id, varyWording } = await readValidatedBody(event, bodySchema.parse);
  const res = await Campaign.updateOne(
    { _id, userId: user._id },
    { $set: { varyWording } }
  );
  if (res.matchedCount === 0) {
    throw createError({ statusCode: 404, message: "Campaign not found." });
  }
  return { success: true, varyWording };
});

export { vary_post as default };
//# sourceMappingURL=vary.post.mjs.map
