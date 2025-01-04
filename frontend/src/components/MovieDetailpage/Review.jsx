import React, { useState, useEffect } from 'react';
import apiClient from '../apiInstance/apiInstance';

const CompleteReview = ({ movieId }) => {
  const apiBaseUrl = 'https://movie-appnetlify.vercel.app/api/v3/tmdb';
  const profileUrl = `/profile`;
  const [userId, setUserId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('access');
      if (!token) return;

      try {
        const response = await apiClient.get(profileUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(response.data.user._id);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError('Failed to fetch user profile. Please try again.');
      }
    };

    fetchUserId();
  }, []);

  const fetchReviews = async () => {
    if (!movieId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/users/${movieId}/reviews`);
      if (response.data.message === 1) {
        setReviews('');
      } else {
        setReviews(response.data || []);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setReviews([]);
        setError('No reviews found for this movie.');
      } else {
        setError('Failed to load reviews. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText.trim() || rating <= 0) {
      setError('Review and rating cannot be empty.');
      return;
    }

    if (!userId) {
      setError('User is not authenticated. Please log in.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await apiClient.post(`/users/${userId}/reviews`, {
        tmdb_id: movieId,
        review: reviewText,
        rating,
      });

      await fetchReviews();
      setReviewText('');
      setRating(0);
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error('Error submitting review:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-sm max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-3 text-center text-indigo-600">Movie Reviews</h2>

      {loading && <p className="text-blue-500 text-sm">Loading...</p>}
      {error && <p className="text-blue-500 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <div className="mt-2">
          <label className="block text-gray-600 text-sm mb-1">Rating:</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-lg ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 w-full bg-indigo-500 text-white py-1 text-sm rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">No reviews yet. Be the first to add one!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="p-3 border rounded-md bg-white shadow-sm">
              <p className="text-sm text-gray-700">{review.reviewText}</p>
              <div className="flex items-center space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompleteReview;
