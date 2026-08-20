import { a as defineEventHandler, j as getHeader, b as createError, k as runTask } from '../../nitro/nitro.mjs';
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

const cron = defineEventHandler(async (event) => {
  const authHeader = getHeader(event, "Authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized system execution footprint."
    });
  }
  try {
    console.log("Vercel Cron triggered: Executing background task engine...");
    const taskResult = await runTask("lead:reminders");
    return {
      success: true,
      executedAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...taskResult
    };
  } catch (error) {
    console.error("Vercel Cron automation step crashed:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Internal task handler fault."
    });
  }
});

export { cron as default };
//# sourceMappingURL=cron.mjs.map
