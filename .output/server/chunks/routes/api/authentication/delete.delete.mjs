import { a as defineEventHandler, b as createError, s as schemaImport, U as UserModelImport } from '../../../nitro/nitro.mjs';
import { l as loggedInUser } from '../../../_/loggedInUser.mjs';
import { C as CampaignModelImport } from '../../../_/Campaign.mjs';
import { H as HomeModel } from '../../../_/Home.mjs';
import Stripe from 'stripe';
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

const UserDoc = UserModelImport;
const Lead = schemaImport;
const Campaign = CampaignModelImport;
const Home = HomeModel;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const delete_delete = defineEventHandler(async (event) => {
  try {
    const user = await loggedInUser(event);
    if (!(user == null ? void 0 : user._id)) {
      throw createError({ statusCode: 401, statusMessage: "Session expired." });
    }
    const stripeSubscriptionId = user == null ? void 0 : user.stripeSubscriptionId;
    if (stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(stripeSubscriptionId);
      } catch (err) {
        console.error("Stripe cancellation during account deletion failed:", err.message);
      }
    }
    await Promise.all([
      Lead.deleteMany({ userId: user._id }),
      Campaign.deleteMany({ userId: user._id }),
      Home.deleteMany({ userId: user._id })
    ]);
    await UserDoc.deleteOne({ _id: user._id });
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      statusMessage: "Please try again."
    });
  }
});

export { delete_delete as default };
//# sourceMappingURL=delete.delete.mjs.map
