import { d as defineEventHandler, e as getHeader, f as readRawBody } from '../../../nitro/nitro.mjs';
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
  const signature = getHeader(event, "stripe-signature");
  const rawBody = await readRawBody(event);
  let stripeEvent;
  stripeEvent = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  const session = stripeEvent.data.object;
  if (stripeEvent.type === "checkout.session.completed") {
    const mongoUserId = session.client_reference_id;
    if (mongoUserId) {
      console.log(`Success: Found client reference mapping to user ${mongoUserId}`);
      await User.updateOne({ _id: mongoUserId }, { $set: { plan: "phantom", paid: true } });
    } else {
      console.error("\u26A0\uFE0F Warning: Payment completed without a client_reference_id link.");
    }
  }
  return { received: true };
});

export { webhook_post as default };
//# sourceMappingURL=webhook.post.mjs.map
