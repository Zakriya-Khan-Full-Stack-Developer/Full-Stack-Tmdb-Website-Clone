import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Add spinner component
import apiClient from "../apiInstance/apiInstance";

const MovieListPage = () => {
  const { category, page } = useParams(); // Extract category and page from URL
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/movies/${category}`, {
          params: { page, language: "en" },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [category, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      navigate(`/list/movie/${category}/${newPage}`);
    }
  };

  return (
    <div className="movie-list-page bg-white min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-[#E50914] text-center mb-12">
        {category.charAt(0).toUpperCase() + category.slice(1)} Movies
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#E50914" size={60} />
        </div>
      ) : error ? (
        <div className="text-center text-2xl text-red-600">{error}</div>
      ) : (
        <>
          {/* Adjust grid for mobile and desktop screens */}
          <div className="movie-grid grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 justify-center">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="pagination flex justify-center items-center gap-6">
            <button
              disabled={page <= 1}
              onClick={() => handlePageChange(parseInt(page) - 1)}
              className="pagination-btn px-6 py-3 bg-[#E50914] text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:bg-gray-500"
            >
              Previous
            </button>
            <span className="text-lg text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => handlePageChange(parseInt(page) + 1)}
              className="pagination-btn px-6 py-3 bg-[#E50914] text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:bg-gray-500"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const formattedVote = movie.vote_average.toFixed(1); // Round to 1 decimal place
  const percentage = (formattedVote * 10).toFixed(0); // Convert to percentage and round

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="w-full sm:w-full md:max-w-md lg:max-w-lg xl:max-w-xl bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 sm:h-80 md:h-96 object-cover" // Adjust height for mobile, tablet, and larger screens
        />
        <div className="absolute top-3 left-3 bg-black bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center border-2 border-gray-600">
          <span className="text-sm font-semibold text-green-400">{percentage}%</span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
        <p className="text-sm text-gray-400">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieListPage;
