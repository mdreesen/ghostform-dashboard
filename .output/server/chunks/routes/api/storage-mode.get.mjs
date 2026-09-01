import { a as defineEventHandler } from '../../nitro/nitro.mjs';
import { h as hasR2 } from '../../_/storage.mjs';
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

const storageMode_get = defineEventHandler(() => ({ driver: hasR2() ? "r2" : "local" }));

export { storageMode_get as default };
//# sourceMappingURL=storage-mode.get.mjs.map
