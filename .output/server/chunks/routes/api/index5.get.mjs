import { a as defineEventHandler, b as createError } from '../../nitro/nitro.mjs';
import { S as SocialPostModel } from '../../_/SocialPost.mjs';
import { l as loggedInUser } from '../../_/loggedInUser.mjs';
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

const SocialPost = SocialPostModel;
const index_get = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const all = await SocialPost.find({
    userId: user._id,
    status: { $ne: "discarded" }
  }).sort({ createdAt: -1 }).limit(60).lean();
  return {
    approved: all.filter((p) => p.status === "approved"),
    drafts: all.filter((p) => p.status === "draft"),
    posted: all.filter((p) => p.status === "posted").slice(0, 15)
  };
});

export { index_get as default };
//# sourceMappingURL=index5.get.mjs.map
