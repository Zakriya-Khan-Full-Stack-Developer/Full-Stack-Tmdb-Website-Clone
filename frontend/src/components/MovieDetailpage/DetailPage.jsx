import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import CastSection from "./Cast";
import MediaSection from "./MediaSection";
import Recommendations from "./Recommendation";
import Sidebar from "./Sidebar";
import ReviewSection from "./Review"; // Ensure this is the correct component for reviews
import apiClient from "../apiInstance/apiInstance";

function DetailPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch movie details from the API
        const response = await apiClient.get(`/movie/${movieId}`);
        setMovieDetails(response.data);
      } catch (err) {
        setError("Failed to load movie details. Please try again later.");
        setMovieDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !movieDetails) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
        <p className="text-sm font-medium text-red-500">{error || "No Details Found Yet"}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition duration-200"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 text-gray-900">
      <Header movieId={movieId} />
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-3 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 space-y-6 lg:w-2/3 xl:w-3/4">
          <CastSection movieId={movieId} />
          <MediaSection movieId={movieId} />
          <Recommendations movieId={movieId} />
          <ReviewSection movieId={movieId} />
        </div>
        {/* Increased the width of the sidebar container */}
        <div className="lg:w-2/3 xl:w-1/3 space-y-6">
          <Sidebar movieId={movieId} />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
