import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiInstance/apiInstance';

const Recommendations = ({ movieId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const backendUrl = `https://movie-appnetlify.vercel.app/api/v3/tmdb/movie/${movieId}/recommendations`;

  useEffect(() => {
    const fetchRecommendationsData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get(`/movie/${movieId}/recommendations`);
        if (response.data && response.data.data) {
          setRecommendations(response.data.data.results || []);
        } else {
          setError('No recommendations available.');
        }
      } catch (err) {
        setError(`Error fetching recommendations: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendationsData();
  }, [movieId]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const scrollToMovie = (index) => {
    if (sliderRef.current) {
      const movieElement = sliderRef.current.children[index];
      if (movieElement) {
        movieElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  };

  return (
    <section className="bg-gray-900 text-white shadow p-4 rounded-md w-full mx-auto">
      <h2 className="text-lg font-bold mb-3 text-center">Recommended Movies</h2>

      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-sm text-center">{error}</p>
      ) : (
        <div className="relative">
          <div
            ref={sliderRef}
            className="overflow-x-auto flex space-x-2 no-scrollbar w-full"
            style={{ scrollBehavior: 'smooth' }}
          >
            {recommendations.length > 0 ? (
              recommendations.map((movie, index) => (
                <div
                  key={movie.id}
                  className="flex-shrink-0 w-32 sm:w-40 text-center rounded-md bg-gray-800 p-2 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
                  onClick={() => {
                    handleMovieClick(movie.id);
                    scrollToMovie(index);
                  }}
                  aria-label={`View details of ${movie.title}`}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=No+Image'
                    }
                    alt={movie.title}
                    className="w-full h-48 sm:h-56 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-xs font-medium text-gray-300">
                    {movie.title}
                  </h3>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 text-xs">No recommendations available.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Recommendations;
