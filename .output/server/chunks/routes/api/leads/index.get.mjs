import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
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
import '../../../_/mongodb.mjs';
import 'mongoose';
import '../../../_/User.mjs';
import 'zod';

const index_get = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = getRouterParam(event, "id");
    const user = await loggedInUser(event);
    const data = (_a = user == null ? void 0 : user.leads) != null ? _a : [];
    const dataArr = data.filter((item) => item.id.includes(id));
    return dataArr[0];
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
