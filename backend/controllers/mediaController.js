import User from '../models/userSchema.js'; // Adjust path to where the User model is defined
import { Rating, Wishlist, Watchlist } from '../models/schema.js'; // Adjust path to where the schemas are defined
import { Review } from "../models/ReviewSchema.js"

// Add a review for a movie
// Add a review for a movie
export const addReview = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { tmdb_id, review, rating } = req.body; // reviewText should be used correctly as it was sent in the request
 const reviewText =review
    // Log the request body to debug
    console.log(req.body,reviewText);

    // Create a new review document with the provided data
    const newReview = new Review({
      user_id: req.params.userId,  // Assuming you're passing userId in the URL params
      tmdb_id,
      reviewText,  // Use the reviewText from the request body
      rating,
    });


    // Log the created review to check if it's correct
    console.log(newReview);

    // Save the new review to the database
    await newReview.save();

    // Return the new review in the response to immediately show it on the frontend
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    // If there's an error, send the error message in the response
    res.status(400).json({ message: err.message });
  }
};


/// In mediaController.js
export const getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;
 const tmdb_id = movieId
 console.log(movieId,tmdb_id)
  try {
    // Fetch reviews based on tmdb_id using the Mongoose model
    const reviews = await Review.find({ tmdb_id });
    if (!reviews || reviews.length === 0) {
      return res.status(200).json({ message: 1 });
    }
 console.log(reviews)
    // Send the reviews back to the client
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);

    // Return a 500 error if an exception occurs
    res.status(500).json({ message: 'Error fetching reviews.' });
  }
};



// Add a rating to a movie
export const addRating = async (req, res) => {
  try {
    const { tmdb_id, rating } = req.body;

    // Create a new rating
    const newRating = new Rating({
      user_id: req.params.userId,
      tmdb_id,
      rating,
    });

    await newRating.save();

    res.status(201).json({ message: 'Rating added successfully', rating: newRating });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all ratings of a user
export const getRatingsByUser = async (req, res) => {
  try {
      const userId = req.params.userId;
      const ratings = await Rating.find({ userId });

      if (!ratings) {
          return res.status(404).json({ message: 'No ratings found for this user.' });
      }

      res.status(200).json(ratings);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching ratings.' });
  }
};

//// Add a movie to the user's wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { tmdb_id } = req.body;

    // Check if the movie is already in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({
      user_id: req.params.userId,
      tmdb_id,
    });

    if (existingWishlistItem) {
      return res.status(400).json({
        message: 'This movie is already in your wishlist.',
      });
    }

    // Create a new wishlist item
    const newWishlistItem = new Wishlist({
      user_id: req.params.userId,
      tmdb_id,
    });

    await newWishlistItem.save();

    res.status(201).json({ message: 'Movie added to wishlist', wishlistItem: newWishlistItem });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Get all movies in the user's wishlist// Get all movies in the user's wishlist
export const getWishlistByUser = async (req, res) => {
  try {
    // Find wishlist items for the user
    const wishlistItems = await Wishlist.find({ user_id: req.params.userId })

    if (!wishlistItems) {
      return res.status(404).json({ message: 'No wishlist items found for this user' });
    }

    // Return the wishlist items, optionally adding more movie details if populated
    res.status(200).json(wishlistItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Add a movie to the user's watchlist
export const addToWatchlist = async (req, res) => {
  try {
    const { tmdb_id, status } = req.body;

    // Create a new watchlist item
    const newWatchlistItem = new Watchlist({
      user_id: req.params.userId,
      tmdb_id,
      status,
    });

    await newWatchlistItem.save();

    res.status(201).json({ message: 'Movie added to watchlist', watchlistItem: newWatchlistItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all movies in the user's watchlist
export const getWatchlistByUser = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user_id: req.params.userId });
    res.status(200).json(watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update the status of a movie in the user's watchlist
export const updateWatchlistStatus = async (req, res) => {
  try {
    const { tmdb_id, status } = req.body;

    const watchlistItem = await Watchlist.findOne({ user_id: req.params.userId, tmdb_id });

    if (!watchlistItem) {
      return res.status(404).json({ message: 'Movie not found in your watchlist' });
    }

    const validStatuses = ['watching', 'watched', 'paused'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    watchlistItem.status = status;
    if (status === 'watched') {
      watchlistItem.finished_on = new Date();
    }

    await watchlistItem.save();

    res.status(200).json({ message: 'Watchlist status updated', watchlistItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
