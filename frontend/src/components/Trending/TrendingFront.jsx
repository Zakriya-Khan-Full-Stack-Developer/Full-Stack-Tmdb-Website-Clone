import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MovieCard from "../ReusableComponents/MovieCard";
import TabSwitcher from "../ReusableComponents/TabSwitcher";
import apiClient from "../apiInstance/apiInstance";

const TrendingContainer = () => {
  const [filter, setFilter] = useState("today");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await apiClient.get(`/trending/all`);
        setMovies(response.data.results || []);
        console.log(response);
        setError(null);
      } catch (error) {
        setError("Failed to fetch trending movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filter]);

  const toggleMenu = (id) => {
    setMenuVisible((prev) => (prev === id ? null : id));
  };

  const closeMenu = () => {
    setMenuVisible(null);
  };

  const tabs = [
    { value: "today", label: "Today" },
    { value: "thisWeek", label: "This Week" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-container")) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <TabSwitcher
        title="Trending"
        tabs={tabs}
        activeColor="bg-teal-600"
        textColor="text-white"
        onTabChange={setFilter}
      />

      <div className="mt-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="mr-3 mb-4">
              <div className="w-[180px] bg-gray-200 rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="h-[250px] bg-gray-300"></div>
                <div className="p-3">
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="text-red-500 text-center mt-4">{error}</div>
        ) : (
          <div
            className="flex overflow-x-auto space-x-3 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            style={{ whiteSpace: "nowrap" }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="inline-block">
                <MovieCard
                  movie={movie}
                  menuVisible={menuVisible === movie.id}
                  toggleMenu={() => toggleMenu(movie.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingContainer;
