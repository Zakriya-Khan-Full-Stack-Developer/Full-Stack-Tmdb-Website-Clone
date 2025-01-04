// routes/quizRoutes.js

import express from 'express';
import { getMovieQuiz, submitQuiz, getLeaderboard, insertQuizQuestions } from '../../controllers/quizController.js';

const router = express.Router();

// Route to fetch movie trivia questions from the database
router.get('/movie-quiz', getMovieQuiz);

// Route to submit quiz answers and calculate the score
router.post('/submit-quiz', submitQuiz);

// Route to get the leaderboard
router.get('/leaderboard', getLeaderboard);

// Route to bulk insert quiz questions

export default router;
