import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingPopup = ({ movie, onClose }) => {
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getProfileUrl = "https://appnetlify123.vercel.app/api/v3/tmdb/profile"; // Endpoint to get user profile
  const submitRatingUrl = `https://appnetlify123.vercel.app/api/v3/tmdb/users/:userId/ratings`; // Base URL for submitting ratings

  // Fetch the userId from the profile route
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No authentication token found');
          return;
        }

        // Fetch user profile with Authorization header
        const response = await axios.get(getProfileUrl, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token as Authorization header for fetching profile
          },
        });

        console.log('Profile response:', response.data.user);
        setUserId(response.data.user._id); // Assuming the response contains userId
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  // Handle rating submit (without token in this request)
  const handleRatingSubmit = async () => {
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
  
    if (!userId) {
      setError('User ID is missing');
      return;
    }
  
    try {
      setLoading(true);
      const url = `${submitRatingUrl.replace(':userId', userId)}`;
      console.log('Submitting to URL:', url);
  
      // Adjust payload to match your rating schema
      const payload = {
        user_id: userId,         // user_id as ObjectId
        tmdb_id: movie.id,       // tmdb_id should match the movie's TMDb ID
        rating,                  // User rating (0-10 scale)
      };
      console.log('Payload:', payload);
  
      const response = await axios.post(url, payload);
      console.log('Response:', response);
      alert('Rating submitted successfully!');
      onClose(); // Close the popup after submitting
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Rate Movie: {movie.title}</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block mb-2">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="p-2 border rounded w-full"
          >
            <option value={0}>Select Rating</option>
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleRatingSubmit}
            className="bg-teal-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Rating'}
          </button>
          <button
            onClick={onClose}
            className="ml-4 px-4 py-2 border rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingPopup;
