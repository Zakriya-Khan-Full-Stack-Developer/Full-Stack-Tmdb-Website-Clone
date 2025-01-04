import mongoose from 'mongoose';

// Rating Schema
const ratingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tmdb_id: { type: Number, required: true, unique: true },  // Store only the TMDb ID
  rating: { type: Number, min: 0, max: 10, required: true }, // User rating (0-10 scale)
  date: { type: Date, default: Date.now }, // Date of rating
});

// Wishlist Schema
const WishlistSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tmdb_id: { type: Number, required: true,  },  // Store only the TMDb ID

})

// Watchlist Schema
const watchlistSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tmdb_id: { type: Number, required: true, unique: true }, // Store only the TMDb ID
  status: { type: String, enum: ['watching', 'watched', 'paused'], default: 'watching' }, // Status of watching
  started_on: { type: Date, default: Date.now }, // When the user started watching
  finished_on: { type: Date }, // When the user finished watching (optional)
});

// Score Schema
const scoreSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  score: { type: Number, required: true }, // The score the user received for the quiz
  totalScore: { type: Number, default: 0 }, // Cumulative total score for the user (can be updated over time)
  date: { type: Date, default: Date.now }, // Date the quiz was taken
});

// Create Mongoose model for Score
const Score = mongoose.model('Score', scoreSchema);


// Create Mongoose models from schemas
const Rating = mongoose.model('Rating', ratingSchema);
const Wishlist = mongoose.model('Wishlist', WishlistSchema);
const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export { Rating, Wishlist, Watchlist,Score };
