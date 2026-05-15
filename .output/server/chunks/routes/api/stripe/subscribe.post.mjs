import { d as defineEventHandler, b as readBody } from '../../../nitro/nitro.mjs';
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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const subscribe_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = {
    userId: body == null ? void 0 : body.id,
    // Tie this to your MongoDB User ID
    userEmail: body == null ? void 0 : body.email
  };
  const session = await stripe.checkout.sessions.create({
    customer_email: body == null ? void 0 : body.email,
    line_items: [
      {
        price: body.priceId,
        // Your Price ID from Stripe
        quantity: 1
      }
    ],
    mode: "subscription",
    success_url: `${process.env.PROJECT_DOMAIN}/dashboard`,
    cancel_url: `${process.env.PROJECT_DOMAIN}/pricing`,
    metadata: { ...user },
    subscription_data: {
      metadata: { ...user }
    }
  });
  return { url: session.url };
});

export { subscribe_post as default };
//# sourceMappingURL=subscribe.post.mjs.map
