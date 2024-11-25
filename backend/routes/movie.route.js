import express from 'express';
import { getMovieTrailers, getTrendingMovie, getMovieDetail, getSimilarMovies, getMoviesByCategory } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetail);
router.get("/:id/similarMovies", getSimilarMovies)
router.get("/:category", getMoviesByCategory)

export default router;