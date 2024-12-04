import express from 'express';
import { cancelSubscription, subscribePayment, successSubscription } from '../controllers/subscription.controller.js';

const router = express.Router();

router.get("/subscribe", subscribePayment)
router.get("/success", successSubscription)
router.get("/cancel", cancelSubscription)

export default router;