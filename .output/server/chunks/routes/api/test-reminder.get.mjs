import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { Resend } from 'resend';
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

new Resend(process.env.RESEND_KEY);
const testReminder_get = defineEventHandler(async (event) => {
  {
    throw createError({ statusCode: 403, message: "Forbidden outside dev mode." });
  }
});

export { testReminder_get as default };
//# sourceMappingURL=test-reminder.get.mjs.map
