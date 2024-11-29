import express from 'express'
import { getSimilarTvs, getTrendingtTv, getTvDetail, getTvTrailers, getTvShowsByCategory } from '../controllers/tv.controller.js';

const router = express.Router();

router.get("/trending", getTrendingtTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetail);
router.get("/:id/similar", getSimilarTvs)
router.get("/:category", getTvShowsByCategory)

export default router;