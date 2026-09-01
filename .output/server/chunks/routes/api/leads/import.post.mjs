import { a as defineEventHandler, b as createError, r as readValidatedBody, s as schemaImport } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
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

const Lead = schemaImport;
const bodySchema = z.object({
  leads: z.array(z.object({
    name: z.string().optional(),
    email: z.string(),
    phone: z.string().optional(),
    buy_sell_both: z.string().optional(),
    budget: z.number().optional(),
    address: z.string().optional(),
    notes: z.string().optional(),
    source: z.string().optional()
  })).min(1).max(2e3),
  /** What to do when an email already exists in their database. */
  onDuplicate: z.enum(["skip", "update"]).default("skip")
});
const import_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { leads, onDuplicate } = await readValidatedBody(event, bodySchema.parse);
  const emails = leads.map((l) => l.email.toLowerCase());
  const existing = await Lead.find(
    { userId: user._id, email: { $in: emails } },
    { email: 1 }
  ).lean();
  const existingSet = new Set(existing.map((e) => String(e.email).toLowerCase()));
  const toInsert = [];
  const toUpdate = [];
  for (const l of leads) {
    const email = l.email.toLowerCase();
    const doc = {
      userId: user._id,
      name: l.name || email.split("@")[0],
      email,
      phone: l.phone || "",
      buy_sell_both: l.buy_sell_both || "",
      budget: l.budget,
      address: l.address || "",
      notes: l.notes || "",
      // Marked so the realtor can tell imported leads from captured ones —
      // they behave differently and deserve different follow-up.
      source: l.source || "import",
      status: "new"
    };
    if (existingSet.has(email)) {
      if (onDuplicate === "update") toUpdate.push(doc);
    } else {
      toInsert.push(doc);
    }
  }
  let inserted = 0;
  if (toInsert.length) {
    const res = await Lead.insertMany(toInsert, { ordered: false }).catch((err) => {
      var _a;
      console.error("[import] partial insert:", err == null ? void 0 : err.message);
      return (_a = err == null ? void 0 : err.insertedDocs) != null ? _a : [];
    });
    inserted = Array.isArray(res) ? res.length : toInsert.length;
  }
  let updated = 0;
  for (const doc of toUpdate) {
    const { userId, email, ...fields } = doc;
    const set = Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== "" && v !== void 0));
    const r = await Lead.updateOne({ userId: user._id, email }, { $set: set });
    updated += r.modifiedCount;
  }
  return {
    success: true,
    inserted,
    updated,
    skippedExisting: onDuplicate === "skip" ? existingSet.size : 0,
    total: leads.length
  };
});

export { import_post as default };
//# sourceMappingURL=import.post.mjs.map
