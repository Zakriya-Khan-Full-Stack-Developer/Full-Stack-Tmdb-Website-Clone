import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/usercontroller.js';
import { getLeaderboard } from '../controllers/usercontroller.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Protected route to get user profile
router.get('/profile', authmiddleware, getProfile);

// Public route for leaderboard
router.get('/leader', getLeaderboard);

export default router;
