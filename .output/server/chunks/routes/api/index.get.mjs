import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../_/loggedInUser.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jose';
import '@iconify/utils';
import 'consola';
import 'ipx';
import '../../_/mongodb.mjs';
import 'mongoose';
import '../../_/User.mjs';
import 'zod';

const index_get = defineEventHandler(async (event) => {
  var _a;
  const user = await loggedInUser(event);
  return (_a = user == null ? void 0 : user.leads) == null ? void 0 : _a.reverse();
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
