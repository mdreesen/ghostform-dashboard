import { a as defineEventHandler, b as createError, U as UserModelImport } from '../../../nitro/nitro.mjs';
import { A as AssetModel } from '../../../_/Asset.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
import 'mongoose';
import 'openai';
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

const Asset = AssetModel;
const User = UserModelImport;
const headshot_delete = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  await Asset.deleteOne({ userId: user._id, kind: "headshot" });
  await User.updateOne({ _id: user._id }, { $set: { headshot_url: "" } });
  return { success: true };
});

export { headshot_delete as default };
//# sourceMappingURL=headshot.delete.mjs.map
