import { u as useRuntimeConfig, a as defineEventHandler, b as createError } from '../../../../nitro/nitro.mjs';
import { D as DocumentModel } from '../../../../_/Document.mjs';
import { f as fetchAsBase64 } from '../../../../_/storage.mjs';
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

function buildPrompt(filename, today) {
  return [
    `Read this real estate document and pull out the dates that matter.`,
    `Filename: ${filename}`,
    `Today's date: ${today}`,
    ``,
    `FIRST decide what kind of document it is \u2014 purchase agreement, listing`,
    `agreement, inspection report, disclosure, addendum, repair estimate,`,
    `something else. Which dates matter depends entirely on that.`,
    ``,
    `THEN extract every date that creates an obligation or a deadline for the`,
    `agent. Examples of what counts:`,
    `  \xB7 inspection or due-diligence period ending`,
    `  \xB7 financing or appraisal contingency expiring`,
    `  \xB7 earnest money due`,
    `  \xB7 closing / settlement date`,
    `  \xB7 listing agreement expiry`,
    `  \xB7 offer or counter-offer expiry`,
    `  \xB7 repair completion or re-inspection`,
    `  \xB7 possession or key handover`,
    ``,
    `For EACH date give:`,
    `  label      \u2014 what has to happen, in the agent's words ("Inspection`,
    `               contingency expires"). Not a quote from the contract.`,
    `  date       \u2014 ISO YYYY-MM-DD. If the document says "10 days from`,
    `               acceptance", calculate it and say so in sourceText.`,
    `  sourceText \u2014 the sentence you took it from, VERBATIM. This is how the`,
    `               agent checks your work. Never paraphrase it.`,
    `  priority   \u2014 high | medium | low`,
    `  reason     \u2014 one short line on why that priority`,
    ``,
    `PRIORITY MEANS:`,
    `  high   \u2014 missing it loses the deal or costs money. Contingency`,
    `           deadlines, earnest money, financing dates, closing.`,
    `  medium \u2014 needs doing but has slack. Scheduling, document returns.`,
    `  low    \u2014 informational or far off. Expiry dates months away.`,
    ``,
    `Also write a 2-3 line summary of what this document is and what it commits`,
    `the parties to.`,
    ``,
    `HARD RULES`,
    `- If a date is ambiguous or you had to infer it, say so plainly in`,
    `  sourceText. An honest "unclear" is far better than a confident guess \u2014`,
    `  the agent will act on this.`,
    `- Do NOT include dates that create no obligation (the date it was printed,`,
    `  someone's birthday, a past date that has already passed).`,
    `- Do NOT give legal advice or interpret what a clause means. Report what`,
    `  it says.`,
    `- Do NOT repeat any Social Security number, bank account, or full card`,
    `  number in the summary or sourceText, even if the document contains one.`,
    ``,
    `Return ONLY JSON, no fence:`,
    `{"docType":"...","summary":"...","deadlines":[{"label":"...","date":"YYYY-MM-DD",`,
    `"sourceText":"...","priority":"high","reason":"..."}]}`
  ].join("\n");
}
const SENSITIVE = [
  /\b\d{3}-\d{2}-\d{4}\b/g,
  // SSN
  /\b\d{13,19}\b/g,
  // card / account numbers
  /\b\d{9,12}\b(?=\s*(routing|account))/gi
];
function redact(text) {
  let out = String(text || "");
  for (const re of SENSITIVE) out = out.replace(re, "[removed]");
  return out;
}
async function readDocument(base64, mime, filename) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const cfg = useRuntimeConfig();
  const key = cfg.anthropicKey;
  if (!key) throw new Error("CONFIG: ANTHROPIC_API_KEY is not set.");
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const isPdf = mime === "application/pdf";
  const content = [{
    type: isPdf ? "document" : "image",
    source: { type: "base64", media_type: mime, data: base64 }
  }, {
    type: "text",
    text: buildPrompt(filename, today)
  }];
  try {
    const res = await $fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        // PDF document blocks require this beta header. Without it the API
        // rejects the request, which surfaced as "we could not find dates" —
        // blaming the document for a header problem.
        ...isPdf ? { "anthropic-beta": "pdfs-2024-09-25" } : {},
        "content-type": "application/json"
      },
      body: {
        model: cfg.anthropicModel,
        max_tokens: 2e3,
        messages: [{ role: "user", content }]
      }
    });
    const raw = (_b = (_a = res == null ? void 0 : res.content) == null ? void 0 : _a.find((b) => b.type === "text")) == null ? void 0 : _b.text;
    if (!raw) throw new Error("MODEL: the API returned no text.");
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const s = cleaned.indexOf("{"), e = cleaned.lastIndexOf("}");
    if (s === -1) throw new Error("MODEL: response was not JSON.");
    const parsed = JSON.parse(cleaned.slice(s, e + 1));
    const deadlines = ((_c = parsed.deadlines) != null ? _c : []).map((d) => {
      var _a2, _b2, _c2, _d2;
      return {
        label: redact(String((_a2 = d.label) != null ? _a2 : "")).slice(0, 120),
        date: String((_b2 = d.date) != null ? _b2 : ""),
        sourceText: redact(String((_c2 = d.sourceText) != null ? _c2 : "")).slice(0, 400),
        priority: ["high", "medium", "low"].includes(d.priority) ? d.priority : "medium",
        reason: redact(String((_d2 = d.reason) != null ? _d2 : "")).slice(0, 160)
      };
    }).filter((d) => d.label && !Number.isNaN(Date.parse(d.date)));
    return {
      docType: redact(String((_d = parsed.docType) != null ? _d : "")).slice(0, 60),
      summary: redact(String((_e = parsed.summary) != null ? _e : "")).slice(0, 600),
      deadlines
    };
  } catch (err) {
    const detail = ((_g = (_f = err == null ? void 0 : err.data) == null ? void 0 : _f.error) == null ? void 0 : _g.message) || ((_j = (_i = (_h = err == null ? void 0 : err.response) == null ? void 0 : _h._data) == null ? void 0 : _i.error) == null ? void 0 : _j.message) || (err == null ? void 0 : err.message);
    console.error("[document] read failed:", {
      status: (err == null ? void 0 : err.status) || (err == null ? void 0 : err.statusCode),
      detail,
      model: cfg.anthropicModel,
      isPdf
    });
    if (String(detail).match(/beta|pdf/i)) throw new Error(`PDF: ${detail}`);
    if ((err == null ? void 0 : err.status) === 401 || (err == null ? void 0 : err.statusCode) === 401) throw new Error("CONFIG: the API key was rejected.");
    if ((err == null ? void 0 : err.status) === 429 || (err == null ? void 0 : err.statusCode) === 429) throw new Error("RATE: too many requests.");
    throw new Error(`MODEL: ${detail || "unknown error"}`);
  }
}

const Doc = DocumentModel;
const read_post = defineEventHandler(async (event) => {
  var _a;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  const doc = await Doc.findOne({ _id: id, userId: user._id }).lean();
  if (!doc) throw createError({ statusCode: 404, message: "Document not found." });
  await Doc.updateOne({ _id: id }, { $set: { status: "reading", failureReason: "" } });
  const run = async () => {
    try {
      const file = await fetchAsBase64(doc.storageKey);
      if (!file) throw new Error("Could not read the file from storage.");
      const reading = await readDocument(file.data, file.mime || doc.mime, doc.filename);
      if (!reading) throw new Error("The document could not be read.");
      await Doc.updateOne({ _id: id }, {
        $set: {
          docType: reading.docType,
          summary: reading.summary,
          // confirmed:false — these are proposals, not reminders.
          deadlines: reading.deadlines.map((d) => ({
            label: d.label,
            date: new Date(d.date),
            sourceText: d.sourceText,
            priority: d.priority,
            confirmed: false,
            dismissed: false,
            completed: false
          })),
          status: "ready"
        }
      });
    } catch (err) {
      const msg = String((err == null ? void 0 : err.message) || "");
      console.error("[document] read failed for", id, msg);
      let reason = "We could not read that document. You can add dates yourself.";
      if (msg.startsWith("CONFIG:")) {
        reason = "Document reading is not configured yet. This is on us \u2014 the AI key is missing or rejected.";
      } else if (msg.startsWith("RATE:")) {
        reason = "Too many requests right now. Wait a minute and try reading it again.";
      } else if (msg.startsWith("PDF:")) {
        reason = "We could not open that PDF. If it is a scan, try a photo of the pages instead.";
      } else if (/storage/i.test(msg)) {
        reason = "We could not open that file. Try uploading it again.";
      }
      await Doc.updateOne({ _id: id }, { $set: { status: "failed", failureReason: reason } });
    }
  };
  event.waitUntil ? event.waitUntil(run()) : run();
  return { status: "reading" };
});

export { read_post as default };
//# sourceMappingURL=read.post.mjs.map
