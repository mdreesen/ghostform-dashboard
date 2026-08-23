import { a as defineEventHandler } from '../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../_/loggedInUser.mjs';
import { H as HomeModel } from '../../_/Home.mjs';
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
const index_get = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  const data = await Home.find({ userId: user == null ? void 0 : user._id }).sort({ createdAt: -1 }).lean();
  return data;
});

export { index_get as default };
//# sourceMappingURL=index3.get.mjs.map
