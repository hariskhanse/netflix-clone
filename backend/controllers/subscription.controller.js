import Stripe from 'stripe';
import Subscription from './../models/subscription.model.js';

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
export async function updateSubscription(req, res) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
    const subscriptionId = req.body.subscriptionId;
    const newPlan = req.body.newPlan;
    if (!subscriptionId || !newPlan) {
        return res.status(400).send('Subscription ID or new plan is missing');
    }

    let priceId;

    switch (newPlan.toLowerCase()) {
        case 'starter':
            priceId = 'price_1QRUMZCsF6BsqQoYfLu0m7CG';
            break;
        case 'pro':
            priceId = 'price_1QRUNICsF6BsqQoYimKlTrWN';
            break;
        default:
            return res.status(404).send('New plan not found');
    }
    var subscriptionData = await Subscription.findOne({ _id: subscriptionId });
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionData?.subscriptionId);
        if (!subscription) {
            return res.status(404).send('Subscription not found');
        }

        const updatedSubscription = await stripe.subscriptions.update(subscriptionData?.subscriptionId, {
            items: [{
                id: subscription.items.data[0].id,
                price: priceId,
            }],
        });

        res.status(200).json({ success: true, updatedSubscription });
    } catch (error) {
        console.error('Error updating subscription:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

export async function cancelSubscription(req, res) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
    const subscriptionId = req.body.subscriptionId;
    if (!subscriptionId) {
        return res.status(400).send('Subscription ID is missing');
    }
    var subscriptionData = await Subscription.findOne({ _id: subscriptionId });
    try {
        const canceledSubscription = await stripe.subscriptions.cancel(subscriptionData?.subscriptionId);

        res.status(200).json({ success: true, canceledSubscription });
    } catch (error) {
        console.error('Error canceling subscription:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

export async function getSubscriptionData(req, res) {
    const subscriptionId = req.query.subscriptionId;

    if (!subscriptionId) {
        return res.status(400).send('Subscription ID is missing');
    }

    try {
        const subscription = await Subscription.findById(subscriptionId);

        if (!subscription) {
            return res.status(404).send('Subscription not found');
        }

        res.status(200).json({ success: true, subscription });
    } catch (error) {
        console.error('Error retrieving subscription data:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
