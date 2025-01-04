import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import apiClient from "../apiInstance/apiInstance";

const CastSection = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get(`/movie/${movieId}/credits`);

        if (response.data?.data?.cast) {
          setCast(response.data.data.cast);
        } else {
          throw new Error("Invalid response format or missing 'cast' data.");
        }
      } catch (error) {
        setError(error.message || "Failed to load cast information.");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 200;
    }
  };

  const handlePersonClick = (personId) => {
    navigate(`/person/${personId}`); // Navigate to the person's details page
  };

  return (
    <div className="mt-10 bg-dark-800 p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-4">Top Billed Cast</h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-center text-sm">Error: {error}</p>
      ) : cast.length > 0 ? (
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 focus:outline-none"
          >
            &#8592;
          </button>

          <div
            ref={sliderRef}
            className="overflow-x-auto flex space-x-4 max-w-full mx-auto transition-transform duration-300 ease-in-out scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {cast.map((member) => (
              <div
                key={member.cast_id || member.id}
                className="flex-shrink-0 bg-dark-600 rounded-lg shadow-md p-4 w-36 mb-4 transform hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer"
                onClick={() => handlePersonClick(member.id)} // Add click handler for navigation
              >
                <img
                  src={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={member.name}
                  className="rounded-lg mb-2 object-cover w-full h-52"
                />
                <p className="text-xs font-medium text-white">{member.name}</p>
                <p className="text-xs text-gray-400">{member.character}</p>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 focus:outline-none"
          >
            &#8594;
          </button>
        </div>
      ) : (
        <p className="text-gray-400 text-center text-sm">No cast information available for this movie.</p>
      )}
    </div>
  );
};

export default CastSection;
