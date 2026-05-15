import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const user = {
        userId: body?.id, // Tie this to your MongoDB User ID
        userEmail: body?.email
    }

    const session = await stripe.checkout.sessions.create({
        customer_email: body?.email,
        line_items: [
            {
                price: body.priceId, // Your Price ID from Stripe
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