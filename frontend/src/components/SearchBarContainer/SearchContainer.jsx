import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();
  const location = useLocation();

  // Update the search term if the query parameter changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    setSearchTerm(query);

    // Reset error state
    setError("");

    // Navigate to root page if the query is empty (for empty search)
    if (!query.trim()) {
      navigate(`/`);
    }
  }, [location.search, navigate]);

  const handleSearchChange = (e) => {
    const value = e.target.value;

    // Validate search term for special characters
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      setError("Search term contains invalid characters.");
      return;
    }

    setError(""); // Clear error if input is valid
    setSearchTerm(value); // Update the search term

    // Navigate to the search results page with the query as a URL parameter
    if (value.trim()) {
      navigate(`/search-list?query=${encodeURIComponent(value)}&page=1`);
    } else {
      navigate(`/`); // Navigate to the root page if input is empty
    }
  };

  return (
    <div className="relative">
      {/* SearchBar Section */}
      <div
        className="bg-cover bg-center flex justify-center items-center h-[30vh] relative"
        style={{
          backgroundImage: "url('background1.webp')", // Replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0" />

        <div className="relative z-10 text-center text-white px-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-4 leading-snug max-w-md mx-auto">
            Welcome.<br />
            Discover millions of movies, TV shows,<br />
            and people. Explore now.
          </h2>

          {/* Search Bar */}
          <div className="flex items-center justify-center w-full max-w-md mx-auto bg-[#1c1c1c] rounded-full shadow-md overflow-hidden z-10">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow py-2 px-4 text-sm text-gray-300 focus:outline-none rounded-full transition-all duration-300 hover:bg-gray-800 focus:bg-gray-900"
              value={searchTerm}
              onChange={handleSearchChange} // Navigate on input change
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="mt-2 text-red-500 text-sm">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
