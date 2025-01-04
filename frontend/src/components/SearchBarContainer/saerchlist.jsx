import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchContainer";
import apiClient from "../apiInstance/apiInstance";

const backendUrl = "https://movie-appnetlify.vercel.app/api/v3/tmdb";

const SearchList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Movies");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = useMemo(
    () => [
      { name: "Movies", apiEndpoint: "/search/movie" },
      { name: "TV Shows", apiEndpoint: "/search/tv" },
      { name: "People", apiEndpoint: "/search/person" },
      { name: "All", apiEndpoint: "/search/multi" },
    ],
    []
  );

  const getQueryFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || "";
  };

  const searchItems = async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const selectedApi = categories.find((c) => c.name === selectedCategory).apiEndpoint;
      const response = await apiClient.get(`${selectedApi}`, {
        params: { query, page },
      });

      setResults(response.data.data.results || []);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialQuery = getQueryFromUrl();
    if (initialQuery) {
      searchItems(initialQuery);
    }
  }, [location.search, page, selectedCategory]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setPage(1);
    setResults([]);
    const query = getQueryFromUrl();
    navigate(`/search-list?query=${encodeURIComponent(query)}&category=${categoryName}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleItemClick = (item) => {
    if (selectedCategory === "Movies" || selectedCategory === "TV Shows") {
      navigate(`/movie/${item.id}`);
    } else if (selectedCategory === "People") {
      navigate(`/person/${item.id}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-lg">
        <SearchBar
          onSearch={(query) => {
            setPage(1);
            searchItems(query);
          }}
        />
      </div>

      {/* Horizontal Menu */}
      <nav className="bg-white shadow-md sticky top-16 z-40">
        <ul className="flex flex-wrap justify-around lg:justify-start gap-4 p-4 border-b">
          {categories.map((category) => (
            <li
              key={category.name}
              onClick={() => handleCategoryChange(category.name)}
              className={`cursor-pointer px-4 py-2 rounded-lg transition ${
                selectedCategory === category.name
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {error && (
          <div className="text-center text-red-500 mb-4">
            {error}{" "}
            <button
              onClick={() => searchItems(getQueryFromUrl())}
              className="underline text-blue-500 hover:text-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center my-6">
            <div className="spinner-border text-blue-500 h-10 w-10 animate-spin rounded-full border-4 border-blue-300 border-t-transparent"></div>
            <p className="text-gray-500 mt-2">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.length > 0 ? (
              results.map((item) => (
                <div
                  key={item.id}
                  className="flex bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                  onClick={() => handleItemClick(item)}
                >
                  {selectedCategory === "People" ? (
                    <div className="flex flex-col items-center p-4">
                      <img
                        src={
                          item.profile_path
                            ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                            : `https://via.placeholder.com/200`
                        }
                        alt={item.name}
                        className="w-24 sm:w-32 object-cover rounded-full mb-4"
                      />
                      <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                    </div>
                  ) : (
                    <div className="flex">
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                            : `https://via.placeholder.com/200`
                        }
                        alt={item.title || item.name}
                        className="w-24 sm:w-32 object-cover rounded-md"
                      />
                      <div className="p-4 flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">{item.title || item.name}</h4>
                        <p className="text-sm text-gray-500">{item.release_date || item.first_air_date}</p>
                        <p className="text-sm text-gray-700">{(item.overview || "").substring(0, 150)}...</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No results found.</div>
            )}
          </div>
        )}

        {!loading && (
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchList;
