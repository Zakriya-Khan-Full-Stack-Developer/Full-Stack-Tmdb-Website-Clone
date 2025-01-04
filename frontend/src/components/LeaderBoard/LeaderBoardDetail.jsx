import React, { useState, useEffect } from "react";
import { FaTrophy, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";

// Loader component for the loading state
const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="loader-border animate-spin rounded-full border-t-4 border-blue-600 h-16 w-16"></div>
  </div>
);

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Default is page 1
  const [usersPerPage] = useState(10); // Display 10 users per page
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/api/v3/tmdb/leader", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const usersData = response.data;
          console.log("Fetched data:", usersData); // Debugging log

          // Check if usersData is an array or if it's wrapped in another object
          if (Array.isArray(usersData)) {
            setUsers(usersData);
          } else if (usersData.user && Array.isArray(usersData.user)) {
            setUsers(usersData.user);
          }

          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error("Error fetching leaderboard data:", error);
          setLoading(false); // Set loading to false on error
        }
      }
    };

    fetchLeaderboardData();
  }, []);

  // Calculate the current page's users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination Controls
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 min-h-screen w-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-extrabold text-[#1b3647]">Leaderboard</h2>
        <FaTrophy className="text-[#E50914] text-3xl" />
      </div>

      {/* Display Loader while data is being fetched */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentUsers.map((user, index) => (
              <Link key={index} to={`/leaderboard/${user.username}`}>
                <div className="flex items-center justify-between bg-[#F9FAFB] rounded-lg p-4 hover:bg-[#E2E3E8] transition-colors shadow-md">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-lg text-white ${getRandomColor(
                        user.username
                      )}`}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3 text-[#1b3647] font-semibold text-base">
                      {user.username}
                    </div>
                  </div>

                  <div className="flex items-center text-[#1b3647] font-semibold text-sm">
                    <FaStar className="text-yellow-400 mr-2" />
                    {user.totalScore}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#1b3647] text-white rounded-lg mr-2 text-sm disabled:bg-gray-300"
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  currentPage === number
                    ? "bg-[#E50914] text-white"
                    : "bg-[#F9FAFB] text-[#1b3647]"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
              className="px-4 py-2 bg-[#1b3647] text-white rounded-lg ml-2 text-sm disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const getRandomColor = (username) => {
  const colors = [
    "bg-[#4285F4]", // Google blue
    "bg-[#DB4437]", // Google red
    "bg-[#F4B400]", // Google yellow
    "bg-[#0F9D58]", // Google green
    "bg-[#FFB6C1]", // Light pink
    "bg-[#FFD700]", // Gold
    "bg-[#32CD32]", // Lime Green
    "bg-[#8A2BE2]", // Blue Violet
    "bg-[#FF6347]", // Tomato
    "bg-[#20B2AA]", // Light Sea Green
  ];

  const index = username.charCodeAt(0) % colors.length;
  return colors[index];
};

export default Leaderboard;
