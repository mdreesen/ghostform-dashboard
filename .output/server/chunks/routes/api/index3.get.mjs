import { a as defineEventHandler, b as createError, m as getQuery } from '../../nitro/nitro.mjs';
import { D as DocumentModel } from '../../_/Document.mjs';
import { l as loggedInUser } from '../../_/loggedInUser.mjs';
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

const Doc = DocumentModel;
const index_get = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const q = getQuery(event);
  const filter = { userId: user._id };
  if (q.homeId) filter.homeId = q.homeId;
  if (q.leadId) filter.leadId = q.leadId;
  return Doc.find(filter).sort({ createdAt: -1 }).limit(200).lean();
});

export { index_get as default };
//# sourceMappingURL=index3.get.mjs.map
