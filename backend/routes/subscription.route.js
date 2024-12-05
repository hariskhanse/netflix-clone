import express from 'express';
import { cancelSubscription, subscribePayment, updateSubscription, getSubscriptionData } from '../controllers/subscription.controller.js';

const router = express.Router();

router.get("/subscribe", subscribePayment)
router.put("/update", updateSubscription)
router.delete("/cancel", cancelSubscription)
router.get("/getSubscriptionData", getSubscriptionData)

export default router;