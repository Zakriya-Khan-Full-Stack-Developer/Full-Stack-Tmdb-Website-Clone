import React, { useState, useEffect } from "react";
import TabSwitcher from "../ReusableComponents/TabSwitcher";
import apiClient from "../apiInstance/apiInstance";

const LatestTrailers = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("now_playing");
  const [selectedTrailerIndex, setSelectedTrailerIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loadingTrailers, setLoadingTrailers] = useState([]);

  const fetchLatestTrailers = async () => {
    try {
      setLoading(true);
      const { data: movieData = { results: [] } } = await apiClient.get(`/movies/${category}`);
      
      const movieTrailers = await Promise.all(
        movieData.results.map(async (movie, index) => {
          setLoadingTrailers((prev) => [...prev, index]);
          try {
            const { data: trailerData = { results: [] } } = await apiClient.get(`/movie/${movie.id}/videos`);
            // Check if trailerData.results is an array before calling .find
            const latestTrailer = Array.isArray(trailerData.data.results)
              ? trailerData.data.results.find(video => video.type === "Trailer")
              : null;

            return { ...movie, trailer: latestTrailer };
          } catch (error) {
            console.error("Error fetching trailer:", error);
            return { ...movie, trailer: null };
          } finally {
            setLoadingTrailers((prev) => prev.filter((i) => i !== index));
          }
        })
      );
      setTrailers(movieTrailers);
    } catch (error) {
      console.error("Error fetching latest trailers:", error);
      setError("Failed to load trailers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLatestTrailers();
    setSelectedTrailerIndex(0); // Reset trailer index when category changes
  }, [category]);

  const tabs = [
    { label: "Now Playing", value: "now_playing" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];

  const handleTrailerClick = (index) => {
    setSelectedTrailerIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-900 text-white px-2 py-6">
      <TabSwitcher
        tabs={tabs}
        selectedTab={category}
        onTabChange={setCategory}
        title="Latest Trailers"
        activeColor="bg-teal-600"
        textColor="text-white"
      />

      {loading ? (
        <div className="flex space-x-2 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-48 w-36 bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-teal-600">
          {trailers.map((movie, index) => (
            <div
              key={movie.id}
              className="relative flex-none w-36 group cursor-pointer"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "path_to_default_image" // Add a default image fallback
                }
                alt={movie.title || "Untitled"}
                className="rounded-lg w-full h-48 object-cover transition-transform transform group-hover:scale-105"
                onClick={() => handleTrailerClick(index)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center text-xs group-hover:bg-opacity-75">
                <h3 className="font-semibold text-sm">{movie.title || "Title not available"}</h3>
                <p className="text-gray-300 text-xs">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          role="dialog"
          aria-labelledby="trailer-modal-title"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-800 p-4 rounded-lg max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="trailer-modal-title" className="sr-only">
              Trailer Modal
            </h2>
            <button
              className="absolute top-2 right-2 text-white text-lg"
              onClick={closeModal}
              aria-label="Close Modal"
            >
              &times;
            </button>
            {trailers[selectedTrailerIndex]?.trailer?.key ? (
              <iframe
                className="w-full h-[calc(100vw*0.56)] sm:h-80 rounded-lg"
                src={`https://www.youtube.com/embed/${trailers[selectedTrailerIndex].trailer.key}`}
                title={trailers[selectedTrailerIndex]?.title || "Trailer"}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="text-white text-center">
                Trailer not available.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestTrailers;
