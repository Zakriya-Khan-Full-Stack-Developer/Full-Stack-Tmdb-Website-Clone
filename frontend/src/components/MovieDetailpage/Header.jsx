import React, { useState, useEffect } from "react";
import apiClient from "../apiInstance/apiInstance";

const Header = ({ movieId }) => {
  const [movieData, setMovieData] = useState({
    details: null,
    trailerKey: null,
    loading: true,
    error: null,
  });
  const [showModal, setShowModal] = useState(false);

  const movieDetailsUrl = `/movie/${movieId}`;
  const trailerUrl = `/movie/${movieId}/videos`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setMovieData((prevState) => ({ ...prevState, loading: true, error: null }));

      try {
        const movieResponse = await apiClient.get(movieDetailsUrl);
        const movie = movieResponse.data.data;

        const trailerResponse = await apiClient.get(trailerUrl);
        const trailerKey = trailerResponse.data.data.results[0]?.key;

        setMovieData({
          details: movie,
          trailerKey,
          loading: false,
          error: null,
        });
      } catch (err) {
        setMovieData({
          details: null,
          trailerKey: null,
          loading: false,
          error: "Failed to load movie details. Please try again later.",
        });
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (movieData.loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="spinner"></div>
      </div>
    );
  }

  if (movieData.error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-center text-red-500">
        <p>{movieData.error}</p>
      </div>
    );
  }

  const { title, overview, vote_average, poster_path, release_date, genres, runtime } = movieData.details;
  const genreList = genres?.map((genre) => genre.name).join(", ");

  return (
    <div className="bg-gray-900 text-white p-8 lg:p-12 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
      {/* Left Section: Poster */}
      <div className="flex-shrink-0 w-full lg:w-1/3">
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={`${title} Poster`}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right Section: Details */}
      <div className="flex-1">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">{title} <span className="text-gray-400 text-lg lg:text-2xl">({new Date(release_date).getFullYear()})</span></h1>
        <p className="text-sm lg:text-base text-gray-400 mt-2">
          {runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : ""} • {genreList} • {new Date(release_date).toLocaleDateString()}
        </p>

        <div className="flex items-center space-x-6 mt-6">
          <div className="flex items-center">
            <div className="w-14 h-14 bg-gray-800 flex items-center justify-center rounded-full">
              <span className="text-xl font-semibold text-green-400">
                {Math.round(vote_average * 10)}%
              </span>
            </div>
            <span className="ml-4 text-gray-400 text-sm">User Score</span>
          </div>

          {movieData.trailerKey && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center bg-blue-600 px-5 py-3 rounded-full text-white text-sm hover:bg-blue-700 transition duration-200"
            >
              <span className="material-icons mr-2"></span> Play Trailer
            </button>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-gray-300 mt-3">{overview}</p>
        </div>
      </div>

      {/* Modal for Trailer */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
          onClick={() => setShowModal(false)}
        >
          <div className="bg-gray-900 w-full max-w-4xl relative p-6" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600"
            >
              ✕
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={`https://www.youtube.com/embed/${movieData.trailerKey}`}
                title="Trailer"
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
