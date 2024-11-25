import express from 'express'
import { likeDislikeContent, getLikeDislikeHistory, updateWatchList } from '../controllers/userChoices.controller.js';

const router = express.Router();

router.post("/likeDislike/:id", likeDislikeContent);
router.get("/likeDislikeHistory", getLikeDislikeHistory);
router.post("/watchLishContent", updateWatchList);

export default router;