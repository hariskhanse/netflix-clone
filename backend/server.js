import express from 'express';
import authRoutes from './routes/auth.route.js'
import movieRoutes from './routes/movie.route.js'
import tvRoutes from './routes/tv.route.js'
import searchRoutes from './routes/search.route.js'
import userChoicesRoutes from './routes/userChoices.route.js'
import subscriptionRoutes from './routes/subscription.route.js'
import { ENV_VARs } from './config/envVar.js';
import { connectDb } from './config/db.js';
import { protectRoute } from './middleware/protectRoutues.js';
import cookieParser from 'cookie-parser';
import Stripe from 'stripe';
import User from './models/user.model.js';
import Subscription from './models/subscription.model.js';

const app = express();
app.use('/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
const PORT = ENV_VARs.PORT
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", protectRoute, movieRoutes)
app.use("/api/v1/tv", protectRoute, tvRoutes)
app.use("/api/v1/search", protectRoute, searchRoutes)
app.use("/api/v1/userChoices", protectRoute, userChoicesRoutes)
app.use("/api/v1/subscription", protectRoute, subscriptionRoutes)

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    if (!sig) {
        return res.status(400).send('Missing Stripe signature');
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }


    switch (event.type) {
        case 'checkout.session.completed': {
            try {
                const session = event.data.object;
                const subscription = await stripe.subscriptions.retrieve(session.subscription);
                const userId = session.client_reference_id;

                if (!userId) {
                    return res.status(400).send('Missing user ID');
                }

                const newSubscription = new Subscription({
                    userId,
                    planId: subscription.items.data[0].price.product,
                    subscriptionId: subscription.id,
                    status: subscription.status,
                    startDate: new Date(subscription.start_date * 1000),
                    endDate: new Date(subscription.current_period_end * 1000),
                });

                await newSubscription.save();

                await User.findByIdAndUpdate(userId, { activeSubscription: newSubscription._id });

            } catch (error) {
                console.error('Error processing subscription:', error.message);
                return res.status(500).send('Internal Server Error');
            }
            break;
        }
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send('Event processed');
});

app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:' + PORT);
    connectDb();
});