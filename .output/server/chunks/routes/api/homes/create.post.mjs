import { d as defineEventHandler, r as readValidatedBody, c as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { H as HomeModel } from '../../../_/Home.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
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
import 'mongoose';
import '../../../_/mongodb.mjs';
import '../../../_/User.mjs';

const Lead = HomeModel;
const bodySchema = z.object({
  name: z.string().nullable(),
  address: z.string().nullable(),
  owner: z.string().nullable(),
  notes: z.string().nullable()
});
const create_post = defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const user = await loggedInUser(event);
  try {
    await Lead.create({ userId: user == null ? void 0 : user._id, ...body });
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
