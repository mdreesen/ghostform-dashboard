import { a as defineEventHandler, b as createError, r as readValidatedBody, x as generateSocialPosts } from '../../../nitro/nitro.mjs';
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

const bodySchema = z.object({
  platform: z.enum(["facebook", "instagram", "x"]),
  topic: z.string().default("personal"),
  details: z.string().optional(),
  count: z.number().min(1).max(5).optional()
});
const generate_post = defineEventHandler(async (event) => {
  const user = await loggedInUser(event);
  if (!(user == null ? void 0 : user._id)) throw createError({ statusCode: 401, message: "Session expired." });
  const { platform, topic, details, count } = await readValidatedBody(event, bodySchema.parse);
  const { posts, source } = await generateSocialPosts(
    platform,
    topic,
    {
      agentName: user.name || user.company,
      company: user.company,
      region: user.region,
      voice: user.voice
    },
    { count, details }
  );
  return { platform, topic, source, posts };
});

export { generate_post as default };
//# sourceMappingURL=generate.post.mjs.map
