import Stripe from 'stripe';

export async function subscribePayment(req, res) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
    const plan = req.query.plan;
    const userId = req.user._id;

    if (!plan) {
        return res.status(400).send('Subscription plan not provided');
    }

    let priceId;

    switch (plan.toLowerCase()) {
        case 'starter':
            priceId = 'price_1QRUMZCsF6BsqQoYfLu0m7CG';
            break;
        case 'pro':
            priceId = 'price_1QRUNICsF6BsqQoYimKlTrWN';
            break;
        default:
            return res.status(404).send('Subscription plan not found');
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            customer_email: req.user.email,
            client_reference_id: userId.toString(),
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${process.env.BASE_URL}`,
            cancel_url: `${process.env.BASE_URL}`,
        });
        return res.status(200).json({ success: true, url: session.url });
    } catch (error) {
        console.error('Stripe Error:', error.message);
        return res.status(500).send('Internal Server Error');
    }
}
export async function successSubscription(req, res) {
    res.send('Subscribed successfully');
}

export async function cancelSubscription(req, res) {
    res.redirect('/');
}
