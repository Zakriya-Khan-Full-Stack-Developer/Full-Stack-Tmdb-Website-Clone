import React, { useState, useEffect, useRef } from "react";
import MovieCard from "../ReusableComponents/MovieCard";
import TabSwitcher from "../ReusableComponents/TabSwitcher"; // Import the TabSwitcher component
import apiClient from "../apiInstance/apiInstance";

const PopularSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("movies"); // Default category: Movies
  const [menuVisible, setMenuVisible] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use the correct endpoint for popular movies or TV shows
        const endpoint = category === "movies" ? "/discover/movie" : "/discover/tv";
        const { data } = await apiClient.get(endpoint);  // Make sure your API client is configured correctly
        if (data.data.results && data.data.results.length > 0) {
          setMovies(data.data.results);
        } else {
          setError("No movies or TV shows found.");
        }
      } catch (error) {
        setError("Failed to fetch popular movies or TV shows.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]); // Fetch movies whenever category changes

  const slideLeft = () =>
    sliderRef.current?.scrollBy({ left: -700, behavior: "smooth" });
  const slideRight = () =>
    sliderRef.current?.scrollBy({ left: 700, behavior: "smooth" });

  const SkeletonLoader = () => (
    <div className="w-[150px] bg-gray-200 rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-[220px] bg-gray-300"></div>
      <div className="p-2">
        <div className="h-3 bg-gray-300 rounded mb-1"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );

  const toggleMenu = (id) => {
    setMenuVisible((prev) => (prev === id ? null : id));
  };

  // Tab options for Movies and TV Shows
  const tabs = [
    { label: "Movies", value: "movies" },
    { label: "TV Shows", value: "tv" },
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      {/* TabSwitcher Component */}
      <TabSwitcher
        tabs={tabs}
        selectedTab={category}
        onTabChange={setCategory}
        title="What's popular"
        activeColor="bg-blue-500"
        textColor="text-white"
      />

      <div className="mt-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="mr-3 mb-4">
              <SkeletonLoader />
            </div>
          ))
        ) : error ? (
          <div className="text-red-500 text-center mt-4">{error}</div>
        ) : (
          <div
            className="flex overflow-x-auto space-x-3 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            style={{ whiteSpace: "nowrap" }}
            ref={sliderRef}
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

export default PopularSection;
