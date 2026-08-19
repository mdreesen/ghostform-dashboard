import loggedInUser from '~/utils/loggedInUser';

import { Model } from 'mongoose';
import UserModel from '../../../lib/database/models/User';
import LeadModel from '../../../lib/database/models/Lead';
import CampaignModel from '../../../lib/database/models/Campaign';
import HomeModel from '../../../lib/database/models/Home';
import { User } from '~/types/user';

import Stripe from 'stripe';

const UserDoc = UserModel as Model<User>;
const Lead = LeadModel as Model<any>;
const Campaign = CampaignModel as Model<any>;
const Home = HomeModel as Model<any>;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default defineEventHandler(async (event) => {
    try {
        const user = await loggedInUser(event);

        if (!user?._id) {
            throw createError({ statusCode: 401, statusMessage: 'Session expired.' });
        }

        // 1. Cancel the Stripe subscription IMMEDIATELY so billing stops now.
        //    Wrapped so a Stripe hiccup never blocks the user from deleting
        //    their account - we still tear down their data below.
        const stripeSubscriptionId = (user as any)?.stripeSubscriptionId as string | undefined;

        if (stripeSubscriptionId) {
            try {
                await stripe.subscriptions.cancel(stripeSubscriptionId);
            } catch (err: any) {
                // Already cancelled / not found is fine; log anything else.
                console.error('Stripe cancellation during account deletion failed:', err.message);
            }
        }

        // 2. Remove the user's owned data, then the user document itself.
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
            statusMessage: 'Please try again.'
        });
    };
});
