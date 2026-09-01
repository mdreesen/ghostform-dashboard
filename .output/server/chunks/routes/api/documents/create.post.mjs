import { a as defineEventHandler, b as createError, r as readValidatedBody } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { D as DocumentModel } from '../../../_/Document.mjs';
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

const Doc = DocumentModel;
const bodySchema = z.object({
  filename: z.string().min(1),
  storageKey: z.string().min(1),
  mime: z.string().default(""),
  bytes: z.number().default(0),
  homeId: z.string().nullish(),
  leadId: z.string().nullish()
});
const create_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const body = await readValidatedBody(event, bodySchema.parse);
  const doc = await Doc.create({
    userId: user._id,
    filename: body.filename,
    storageKey: body.storageKey,
    mime: body.mime,
    bytes: body.bytes,
    homeId: body.homeId || void 0,
    leadId: body.leadId || void 0,
    status: "uploaded"
  });
  return { _id: String(doc._id) };
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
