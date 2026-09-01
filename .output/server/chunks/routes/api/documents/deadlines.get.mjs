import { s as schemaImport, a as defineEventHandler, b as createError } from '../../../nitro/nitro.mjs';
import { D as DocumentModel } from '../../../_/Document.mjs';
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

const Doc = DocumentModel;
const Home = HomeModel;
const Lead = schemaImport;
async function buildDeadlineBriefing(userId, horizonDays = 14) {
  var _a, _b, _c, _d, _e;
  const now = /* @__PURE__ */ new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const horizon = new Date(start);
  horizon.setDate(horizon.getDate() + horizonDays);
  const docs = await Doc.find(
    { userId, "deadlines.confirmed": true },
    { filename: 1, deadlines: 1, homeId: 1, leadId: 1, docType: 1 }
  ).lean();
  const homeIds = [...new Set(docs.map((d) => d.homeId).filter(Boolean).map(String))];
  const leadIds = [...new Set(docs.map((d) => d.leadId).filter(Boolean).map(String))];
  const [homes, leads] = await Promise.all([
    homeIds.length ? Home.find({ _id: { $in: homeIds }, userId }, { name: 1, address: 1 }).lean() : Promise.resolve([]),
    leadIds.length ? Lead.find({ _id: { $in: leadIds }, userId }, { name: 1, email: 1 }).lean() : Promise.resolve([])
  ]);
  const homeById = new Map(homes.map((h) => [String(h._id), h]));
  const leadById = new Map(leads.map((l) => [String(l._id), l]));
  const out = [];
  for (const doc of docs) {
    for (const d of (_a = doc.deadlines) != null ? _a : []) {
      if (!d.confirmed || d.dismissed || d.completed) continue;
      const when = new Date(d.date);
      if (Number.isNaN(when.getTime())) continue;
      if (when > horizon) continue;
      const home = doc.homeId ? homeById.get(String(doc.homeId)) : null;
      const lead = doc.leadId ? leadById.get(String(doc.leadId)) : null;
      out.push({
        documentId: String(doc._id),
        deadlineId: String(d._id),
        filename: doc.filename,
        propertyName: (_b = home == null ? void 0 : home.name) != null ? _b : "",
        propertyAddress: (_c = home == null ? void 0 : home.address) != null ? _c : "",
        leadName: (lead == null ? void 0 : lead.name) || (lead == null ? void 0 : lead.email) || "",
        docType: (_d = doc.docType) != null ? _d : "",
        label: d.label,
        date: when.toISOString(),
        priority: (_e = d.priority) != null ? _e : "medium",
        daysUntil: Math.round((new Date(when).setHours(0, 0, 0, 0) - start.getTime()) / 864e5),
        homeId: doc.homeId ? String(doc.homeId) : void 0,
        leadId: doc.leadId ? String(doc.leadId) : void 0
      });
    }
  }
  return out.sort((a, b) => a.daysUntil - b.daysUntil);
}
function deadlineHeadline(items) {
  const overdue = items.filter((i) => i.daysUntil < 0).length;
  const today = items.filter((i) => i.daysUntil === 0).length;
  if (overdue) return `${overdue} deadline${overdue === 1 ? "" : "s"} overdue`;
  if (today) return `${today} deadline${today === 1 ? "" : "s"} today`;
  const soon = items.filter((i) => i.daysUntil <= 3).length;
  if (soon) return `${soon} deadline${soon === 1 ? "" : "s"} in the next few days`;
  return "";
}

const deadlines_get = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const items = await buildDeadlineBriefing(user._id);
  return { items, headline: deadlineHeadline(items) };
});

export { deadlines_get as default };
//# sourceMappingURL=deadlines.get.mjs.map
