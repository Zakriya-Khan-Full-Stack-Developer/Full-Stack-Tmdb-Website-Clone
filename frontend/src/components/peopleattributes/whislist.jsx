import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToWishlistPopup = ({ movie, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

  const addToWishlistUrl = "http://localhost:8000/api/v3/tmdb";
  const profileUrl = "http://localhost:8000/api/v3/tmdb/profile";

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setError('You must be logged in to add to your wishlist.');
        return;
      }

      try {
        const response = await axios.get(profileUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserId(response.data.user._id);
        } else {
          setError('Failed to fetch user profile.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch user profile.');
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleAddToWishlist = async () => {
    if (!userId) {
      setError('User ID is missing.');
      return;
    }
  
    setLoading(true);
    setError('');
    setSuccess(false);
  
    try {
      const response = await axios.post(
        `${addToWishlistUrl}/users/${userId}/wishlist`,
        {
          tmdb_id: movie.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          alert('Movie added to wishlist!');
          onClose();
        }, 500);
      } else {
        setError('Failed to add to wishlist.');
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
  
      // Check for duplicate error message from the backend
      if (error.response && error.response.data.message.includes('already in your wishlist')) {
        setError('This movie is already in your wishlist.');
      } else {
        setError('Failed to add to wishlist.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Add to Wishlist: {movie.title}</h2>

        {success && <div className="text-green-500 mb-4">Movie successfully added to your wishlist!</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex justify-between">
          <button
            onClick={handleAddToWishlist}
            className="bg-teal-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add to Wishlist'}
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

export default AddToWishlistPopup;
