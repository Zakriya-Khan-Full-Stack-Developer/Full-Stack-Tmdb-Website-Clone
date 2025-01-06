import React, { useState, useEffect } from "react";
import apiClient from "../apiInstance/apiInstance";

function CollectionSection({ movieId }) {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        setError(null); // Clear any previous errors
        const response = await apiClient.get(`/movie/${movieId}/alternative_titles`);

        if (response.data && response.data.data) {
          setCollection(response.data.data); // Assuming 'data.data' contains the collection data
        } else {
          throw new Error("No collection data available");
        }
      } catch (error) {
        setError("Error fetching collection data. Please try again.");
        console.error("Error fetching collection data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [movieId]);

  // Common spinner for loading and error
  if (loading || error) {
    return (
      <section className="bg-white shadow p-4 rounded-md flex justify-center items-center h-48">
        <div className="loader"></div>
        {error && (
          <div className="absolute text-red-500 text-xs mt-2 text-center">
            {error}
          </div>
        )}
      </section>
    );
  }

  const imageUrl =
    collection.length > 0 && collection[0].backdrop_path
      ? `https://image.tmdb.org/t/p/w500${collection[0].backdrop_path}`
      : "https://via.placeholder.com/500x281?text=No+Image+Available";

  return (
    <section className="bg-white shadow p-4 rounded-md">
      <h2 className="text-base font-semibold mb-3">Part of the Gladiator Collection</h2>

      {/* Background image with dynamic URL */}
      <div
        className="h-32 bg-cover bg-center rounded-md"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>

      <p className="mt-3 text-gray-600 text-xs">
        Explore the Gladiator Collection to see more epic stories from ancient Rome and beyond.
        This collection includes cinematic masterpieces that bring history to life.
      </p>

      {/* Alternative Titles List */}
      {collection.length > 0 ? (
        <div className="mt-3">
          <h3 className="text-sm font-semibold">Alternative Titles:</h3>
          <ul className="list-disc ml-5 text-xs text-gray-600">
            {collection.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-xs text-gray-500">No alternative titles available.</p>
      )}

      <button className="mt-3 px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600">
        View Collection
      </button>
    </section>
  );
}

export default CollectionSection;
