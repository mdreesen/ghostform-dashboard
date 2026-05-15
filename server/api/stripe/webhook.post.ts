import { Model } from 'mongoose';
import UserModel from '../../../lib/database/models/User';
import { User } from '~/types/user';
const User = UserModel as Model<User>;

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default defineEventHandler(async (event) => {
  const signature = getHeader(event, 'stripe-signature')
  const rawBody = await readRawBody(event);

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody!, signature!, process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    throw createError({ statusCode: 400, message: 'Webhook Error' })
  };

  const session = stripeEvent.data.object;

  if (stripeEvent.type === 'checkout.session.completed') {
    await User.findOneAndUpdate(
      { _id: session?.metadata?.userId },
      { paid: true }
    );
  }

  return { received: true }
})