import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { U as User$1 } from '../../../_/User.mjs';
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
import 'mongoose';
import 'zod';

const User = User$1;
const index_delete = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    await User.findOneAndUpdate(
      { "leads._id": id },
      { $pull: { "leads": { _id: id } } },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

export { index_delete as default };
//# sourceMappingURL=index.delete.mjs.map
