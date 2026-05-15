import { d as defineEventHandler, e as getHeader, f as readRawBody, c as createError } from '../../../nitro/nitro.mjs';
import { U as User$1 } from '../../../_/User.mjs';
import Stripe from 'stripe';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jose';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'mongoose';
import 'zod';

const User = User$1;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhook_post = defineEventHandler(async (event) => {
  var _a;
  const signature = getHeader(event, "stripe-signature");
  const rawBody = await readRawBody(event);
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    throw createError({ statusCode: 400, message: "Webhook Error" });
  }
  const session = stripeEvent.data.object;
  if (stripeEvent.type === "checkout.session.completed") {
    await User.findOneAndUpdate(
      { _id: (_a = session == null ? void 0 : session.metadata) == null ? void 0 : _a.userId },
      { paid: true }
    );
  }
  return { received: true };
});

export { webhook_post as default };
//# sourceMappingURL=webhook.post.mjs.map
