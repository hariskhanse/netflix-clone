import express from 'express';
import { searchmovie, searchPerson, searchtv, getSearchHistory, deleteSearchHistory, removeItemFromSearchHistory } from '../controllers/search.controller.js';

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchmovie);
router.get("/tv/:query", searchtv);
router.get("/history", getSearchHistory);
router.get("/deleteHistory", deleteSearchHistory)

router.delete("/history/:id", removeItemFromSearchHistory)

export default router;