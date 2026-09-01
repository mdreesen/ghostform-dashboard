import { a as defineEventHandler, b as createError, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
import { h as hasR2 } from '../../../_/storage.mjs';
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

const diagnose_get = defineEventHandler(async (event) => {
  var _a, _b;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const cfg = useRuntimeConfig();
  const key = cfg.anthropicKey;
  const out = {
    storageDriver: hasR2() ? "r2" : "local (.data/uploads)",
    anthropicKeyPresent: Boolean(key),
    anthropicKeyLooksValid: Boolean(key && key.startsWith("sk-ant-")),
    model: cfg.anthropicModel
  };
  if (!key) {
    out.verdict = "ANTHROPIC_API_KEY is missing from .env \u2014 reading cannot work.";
    return out;
  }
  try {
    await $fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: { model: cfg.anthropicModel, max_tokens: 4, messages: [{ role: "user", content: "hi" }] }
    });
    out.apiReachable = true;
    out.verdict = "Key and model both work. If reading still fails, the issue is the PDF itself \u2014 check the server log for [document] read failed.";
  } catch (err) {
    const detail = ((_b = (_a = err == null ? void 0 : err.data) == null ? void 0 : _a.error) == null ? void 0 : _b.message) || (err == null ? void 0 : err.message);
    out.apiReachable = false;
    out.status = (err == null ? void 0 : err.status) || (err == null ? void 0 : err.statusCode);
    out.detail = detail;
    out.verdict = out.status === 401 ? "The API key was rejected. Check ANTHROPIC_API_KEY." : out.status === 404 ? `The model "${cfg.anthropicModel}" was not found. Set ANTHROPIC_MODEL to one your key can use.` : "The API call failed \u2014 see detail.";
  }
  return out;
});

export { diagnose_get as default };
//# sourceMappingURL=diagnose.get.mjs.map
