import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../_/loggedInUser.mjs';
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
import '../../_/mongodb.mjs';
import 'mongoose';
import '../../_/User.mjs';
import 'zod';

const index_get = defineEventHandler(async (event) => {
  try {
    const user = await loggedInUser(event);
    return user;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
