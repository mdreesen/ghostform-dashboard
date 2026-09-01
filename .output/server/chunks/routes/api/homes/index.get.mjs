import { a as defineEventHandler, b as createError, s as schemaImport } from '../../../nitro/nitro.mjs';
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
const Lead = schemaImport;
const index_get = defineEventHandler(async (event) => {
  var _a;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  const home = await Home.findOne({ _id: id, userId: user._id }).lean();
  if (!home) throw createError({ statusCode: 404, message: "Property not found." });
  const leads = await Lead.find({
    userId: user._id,
    $or: [
      { homeId: home._id },
      ...home.address ? [{ address: home.address }] : []
    ]
  }).sort({ createdAt: -1 }).limit(100).lean();
  return { home, leads };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
