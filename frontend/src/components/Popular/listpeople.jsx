import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import apiClient from '../apiInstance/apiInstance';

const Page = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);  // Assume a maximum of 1 page initially
  const navigate = useNavigate();  // Initialize useNavigate

  // Fetch data from API
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/popular/people', {
          params: {
            page: currentPage,
          },
        });
        setPeople(response.data.results);
        setTotalPages(response.data.total_pages);  // Assuming the API returns `total_pages`
        setLoading(false);
      } catch (error) {
        console.error('Error fetching people:', error);
        setLoading(false);
      }
    };

    fetchPeople();
  }, [currentPage]); // Fetch data when page changes

  // Handle loading blur effect
  const loadingClass = loading ? "blur-sm" : "";

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle person click to navigate to the person detail page
  const handlePersonClick = (personId) => {
    navigate(`/person/${personId}`);  // Navigate to the person detail page
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Popular People</h2>

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 ${loadingClass}`}>
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-white shadow rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handlePersonClick(person.id)}  // Trigger navigation on click
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-700">{person.name}</h3>
              <p className="text-sm text-gray-500">Known for: {person.known_for_department}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        {/* Previous Page Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400"
        >
          Back {/* Previous arrow */}
        </button>

        {/* Next Page Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400"
        >
          Next {/* Next arrow */}
        </button>
      </div>
    </div>
  );
};

export default Page;
