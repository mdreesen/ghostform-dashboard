import { a as defineEventHandler, b as createError, r as readValidatedBody } from '../../../nitro/nitro.mjs';
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

const Home = HomeModel;
const bodySchema = z.object({ _id: z.string() });
const delete_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { _id } = await readValidatedBody(event, bodySchema.parse);
  const res = await Home.deleteOne({ _id, userId: user._id });
  if (res.deletedCount === 0) {
    throw createError({ statusCode: 404, message: "Property not found." });
  }
  return { success: true };
});

export { delete_post as default };
//# sourceMappingURL=delete.post.mjs.map
