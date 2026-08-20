import { a as defineEventHandler, c as connectDB, j as getHeader, t as readRawBody, b as createError, U as UserModelImport } from '../../../nitro/nitro.mjs';
import Stripe from 'stripe';
import 'mongoose';
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

const UserDoc = UserModelImport;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const ACTIVE_STATUSES = /* @__PURE__ */ new Set(["active", "trialing"]);
const PRICE_TO_PLAN = {
  [process.env.STRIPE_PRICE_SHADOW || ""]: "shadow",
  [process.env.STRIPE_PRICE_PHANTOM || ""]: "phantom"
};
function planFromSubscription(sub) {
  var _a, _b, _c, _d;
  const priceId = ((_d = (_c = (_b = (_a = sub.items) == null ? void 0 : _a.data) == null ? void 0 : _b[0]) == null ? void 0 : _c.price) == null ? void 0 : _d.id) || "";
  return PRICE_TO_PLAN[priceId] || "phantom";
}
const webhook_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  await connectDB();
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
    console.error("Stripe webhook signature verification failed:", err.message);
    throw createError({ statusCode: 400, message: `Webhook Error: ${err.message}` });
  }
  const applyToUser = async (userId, fields) => {
    if (!userId) {
      console.error("Stripe event had no user reference; cannot map to a user.");
      return;
    }
    await UserDoc.updateOne({ _id: userId }, { $set: fields });
  };
  switch (stripeEvent.type) {
    // Fires when the hosted Payment Link / Checkout completes successfully.
    case "checkout.session.completed": {
      const session = stripeEvent.data.object;
      const userId = session.client_reference_id;
      const customerId = session.customer;
      const subscriptionId = session.subscription;
      let plan = "phantom";
      let status = "active";
      if (subscriptionId) {
        try {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          plan = planFromSubscription(sub);
          status = sub.status;
          if (userId && !((_a = sub.metadata) == null ? void 0 : _a.userId)) {
            await stripe.subscriptions.update(subscriptionId, {
              metadata: { userId }
            });
          }
        } catch (err) {
          console.error("Could not retrieve subscription on checkout:", err.message);
        }
      }
      await applyToUser(userId, {
        paid: ACTIVE_STATUSES.has(status),
        plan,
        paid_tier: plan,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        subscriptionStatus: status
      });
      break;
    }
    // Fires on renewals, plan changes, past_due, etc. Keeps our state in sync.
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = stripeEvent.data.object;
      const userId = (_b = sub.metadata) == null ? void 0 : _b.userId;
      const plan = planFromSubscription(sub);
      await applyToUser(userId, {
        paid: ACTIVE_STATUSES.has(sub.status),
        plan,
        paid_tier: plan,
        stripeCustomerId: sub.customer,
        stripeSubscriptionId: sub.id,
        subscriptionStatus: sub.status
      });
      break;
    }
    // Fires when a subscription is cancelled (by us on account deletion, by the
    // customer, or by Stripe for non-payment). Revoke access.
    case "customer.subscription.deleted": {
      const sub = stripeEvent.data.object;
      const userId = (_c = sub.metadata) == null ? void 0 : _c.userId;
      await applyToUser(userId, {
        paid: false,
        subscriptionStatus: "canceled"
      });
      break;
    }
  }
  return { received: true };
});

export { webhook_post as default };
//# sourceMappingURL=webhook.post.mjs.map
