import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tmdb_id: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rating:{
    type:Number,
    required:true
  }
});

const Review = mongoose.model('Review', reviewSchema);

export  {Review};
