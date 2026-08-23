import { a as defineEventHandler, r as readValidatedBody, b as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { H as HomeModel } from '../../../_/Home.mjs';
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

const Lead = HomeModel;
const bodySchema = z.object({
  name: z.string().nullish(),
  // The address is the only field that genuinely matters — it's what gets
  // attached to a captured lead so the realtor knows which listing it came from.
  address: z.string().min(1, "An address is required."),
  owner: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.enum(["active", "pending", "sold"]).optional()
});
const create_post = defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const user = await loggedInUser(event);
  try {
    const created = await Lead.create({ userId: user == null ? void 0 : user._id, ...body });
    return { success: true, _id: String(created._id) };
  } catch (error) {
    console.error("Something went wrong", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Database execution fault."
    });
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
