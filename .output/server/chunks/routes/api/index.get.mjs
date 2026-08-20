import { a as defineEventHandler, b as createError, h as buildDailyBriefing, n as narrateBriefing } from '../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../_/loggedInUser.mjs';
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

const index_get = defineEventHandler(async (event) => {
  var _a;
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) {
    throw createError({ statusCode: 401, message: "Session trace missing or expired." });
  }
  const briefing = await buildDailyBriefing(String(user._id), {
    coldLeadAfterDays: (_a = user.coldLeadAfterDays) != null ? _a : 14
  });
  const narrated = await narrateBriefing(briefing);
  if (narrated) briefing.headline = narrated;
  return briefing;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
