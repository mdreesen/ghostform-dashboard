import Stripe from 'stripe';
import loggedInUser from '~/utils/loggedInUser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * The plans we sell, keyed by a name the client can send safely.
 *
 * PRICE IDS MUST NOT COME FROM THE REQUEST. Taking `body.priceId` let anyone
 * start a checkout against any Stripe price on the account — including a
 * cheaper one, or one from a different product.
 */
const PLANS: Record<string, string | undefined> = {
    shadow: process.env.STRIPE_PRICE_TIER_ONE_KEY,
    phantom: process.env.STRIPE_PRICE_TIER_TWO_KEY
};

export default defineEventHandler(async (event) => {
    /**
     * The identity comes from the SESSION, never the body.
     *
     * This previously read `body.id` and `body.email` — so anyone could POST
     * another user's id and attach a subscription to their account, or start a
     * checkout in someone else's name.
     */
    const account = await loggedInUser(event) as any;
    if (!account?._id) throw createError({ statusCode: 401, message: 'Please sign in first.' });

    const body = await readBody(event);
    const price = PLANS[String(body?.plan || '').toLowerCase()];
    if (!price) throw createError({ statusCode: 400, message: 'Unknown plan.' });

    const user = {
        userId: String(account._id),
        userEmail: account.email
    }

    const session = await stripe.checkout.sessions.create({
        customer_email: account.email,
        line_items: [
            {
                price,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${process.env.PROJECT_DOMAIN}/dashboard`,
        cancel_url: `${process.env.PROJECT_DOMAIN}/pricing`,

        metadata: { ...user },

        subscription_data: {
            metadata: { ...user }
        },
    });
    
    return { url: session.url }
})