import express from 'express';
import { 
  addRating, 
  getRatingsByUser, 
  addToWishlist, 
  getWishlistByUser, 
  addToWatchlist, 
  getWatchlistByUser, 
  updateWatchlistStatus, 
  addReview, 
  getReviewsByMovie 
} from '../controllers/mediaController.js'; // Adjust path to where the controller is defined

const router = express.Router();

// Route to add a rating for a movie
router.post('/users/:userId/ratings', addRating);

// Route to get all ratings for a user
router.get('/users/:userId/ratings', getRatingsByUser);

// Route to add a movie to the user's wishlist
router.post('/users/:userId/wishlist', addToWishlist);

// Route to get all movies in the user's wishlist
router.get('/users/:userId/wishlist', getWishlistByUser);

// Route to add a movie to the user's watchlist
router.post('/users/:userId/watchlist', addToWatchlist);

// Route to get all movies in the user's watchlist
router.get('/users/:userId/watchlist', getWatchlistByUser);

// Route to update the status of a movie in the user's watchlist
router.put('/users/:userId/watchlist/status', updateWatchlistStatus);

// Route to add a review for a movie
router.post('/users/:userId/reviews', addReview);

// Route to get all reviews for a user
router.get('/users/:movieId/reviews', getReviewsByMovie);

export default router;
