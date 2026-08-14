import { Model } from 'mongoose';
import UserModel from '../../../lib/database/models/User';
import { User } from '~/types/user';
import { connectDB } from '../../../lib/database/mongodb';
const UserDoc = UserModel as Model<User>;

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Subscription statuses that should grant dashboard access.
const ACTIVE_STATUSES = new Set(['active', 'trialing']);

// Map a Stripe Price ID to our internal plan name. Fill these in with your
// real Price IDs (from the Stripe dashboard) so the correct tier is recorded.
// Until set, we fall back to 'phantom' so a paid user is never wrongly gated.
const PRICE_TO_PLAN: Record<string, string> = {
  [process.env.STRIPE_PRICE_SHADOW || '']: 'shadow',
  [process.env.STRIPE_PRICE_PHANTOM || '']: 'phantom'
};

function planFromSubscription(sub: Stripe.Subscription): string {
  const priceId = sub.items?.data?.[0]?.price?.id || '';
  return PRICE_TO_PLAN[priceId] || 'phantom';
}

export default defineEventHandler(async (event) => {
  await connectDB();

  const signature = getHeader(event, 'stripe-signature');
  const rawBody = await readRawBody(event);

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody!,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    // Signature failed - reject so Stripe retries and we don't trust the payload.
    console.error('Stripe webhook signature verification failed:', err.message);
    throw createError({ statusCode: 400, message: `Webhook Error: ${err.message}` });
  }

  // Helper: write subscription state onto the user document.
  const applyToUser = async (
    userId: string | undefined | null,
    fields: Record<string, any>
  ) => {
    if (!userId) {
      console.error('Stripe event had no user reference; cannot map to a user.');
      return;
    }
    await UserDoc.updateOne({ _id: userId }, { $set: fields });
  };

  switch (stripeEvent.type) {
    // Fires when the hosted Payment Link / Checkout completes successfully.
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      // client_reference_id carries our Mongo user _id (set on the payment link).
      const userId = session.client_reference_id;
      const customerId = session.customer as string | null;
      const subscriptionId = session.subscription as string | null;

      let plan = 'phantom';
      let status = 'active';

      // Pull the full subscription to learn the tier and true status.
      if (subscriptionId) {
        try {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          plan = planFromSubscription(sub);
          status = sub.status;
          // Also stamp our userId into the subscription metadata so later
          // subscription.* events can map back even without a session.
          if (userId && !sub.metadata?.userId) {
            await stripe.subscriptions.update(subscriptionId, {
              metadata: { userId }
            });
          }
        } catch (err: any) {
          console.error('Could not retrieve subscription on checkout:', err.message);
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
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = stripeEvent.data.object as Stripe.Subscription;
      const userId = sub.metadata?.userId;
      const plan = planFromSubscription(sub);

      await applyToUser(userId, {
        paid: ACTIVE_STATUSES.has(sub.status),
        plan,
        paid_tier: plan,
        stripeCustomerId: sub.customer as string,
        stripeSubscriptionId: sub.id,
        subscriptionStatus: sub.status
      });
      break;
    }

    // Fires when a subscription is cancelled (by us on account deletion, by the
    // customer, or by Stripe for non-payment). Revoke access.
    case 'customer.subscription.deleted': {
      const sub = stripeEvent.data.object as Stripe.Subscription;
      const userId = sub.metadata?.userId;

      await applyToUser(userId, {
        paid: false,
        subscriptionStatus: 'canceled'
      });
      break;
    }

    default:
      // Unhandled event types are fine - just acknowledge them.
      break;
  }

  return { received: true };
});
