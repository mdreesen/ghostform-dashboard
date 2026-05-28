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

  stripeEvent = stripe.webhooks.constructEvent(
    rawBody!, signature!, process.env.STRIPE_WEBHOOK_SECRET!
  )
  const session = stripeEvent.data.object

  if (stripeEvent.type === 'checkout.session.completed') {
    // 👈 Extract the user ID passed from the URL parameter
    const mongoUserId = session.client_reference_id

    if (mongoUserId) {
      console.log(`Success: Found client reference mapping to user ${mongoUserId}`)

      // Update your MongoDB document safely
      await User.updateOne({ _id: mongoUserId }, { $set: { plan: 'phantom', paid: true } })
    } else {
      console.error('⚠️ Warning: Payment completed without a client_reference_id link.')
    }
  }

  return { received: true }
})