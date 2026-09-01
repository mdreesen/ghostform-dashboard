import { a as defineEventHandler, b as createError } from '../../../../nitro/nitro.mjs';
import { D as DocumentModel } from '../../../../_/Document.mjs';
import { d as deleteObject } from '../../../../_/storage.mjs';
import { l as loggedInUser } from '../../../../_/loggedInUser.mjs';
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
import '@aws-sdk/client-s3';
import '@aws-sdk/s3-request-presigner';

const Doc = DocumentModel;
const delete_post = defineEventHandler(async (event) => {
  var _a, _b;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  const doc = await Doc.findOne({ _id: id, userId: user._id }).lean();
  if (!doc) throw createError({ statusCode: 404, message: "Document not found." });
  const liveDeadlines = ((_b = doc.deadlines) != null ? _b : []).filter(
    (d) => d.confirmed && !d.dismissed && !d.completed
  ).length;
  let fileRemoved = true;
  if (doc.storageKey) {
    try {
      await deleteObject(doc.storageKey);
    } catch (err) {
      fileRemoved = false;
      console.error("[document] could not remove stored file for", id);
    }
  }
  await Doc.deleteOne({ _id: id, userId: user._id });
  if (!fileRemoved) {
    console.warn(`[document] record ${id} deleted but its file remains in storage.`);
  }
  return { success: true, liveDeadlines };
});

export { delete_post as default };
//# sourceMappingURL=delete.post.mjs.map
