import { a as defineEventHandler, b as createError, r as readValidatedBody } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { C as CampaignModelImport } from '../../../_/Campaign.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
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
const bodySchema = z.object({
  _id: z.string(),
  active: z.boolean()
});
const toggle_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session trace missing or expired." });
  }
  const body = await readValidatedBody(event, bodySchema.parse);
  try {
    await Campaign.updateOne(
      { _id: body._id, userId: user._id },
      { $set: { active: body.active } }
    );
    return { success: true, active: body.active };
  } catch (error) {
    throw createError({ statusCode: 500, message: "Failed to update campaign state." });
  }
});

export { toggle_post as default };
//# sourceMappingURL=toggle.post.mjs.map
