import React, { useState, useEffect } from "react";
import { FaTrophy, FaStar } from "react-icons/fa";
import axios from "axios"; // Use axios to fetch user data
import apiClient from "../apiInstance/apiInstance";

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await apiClient.get("/leader");
        const usersData = response.data;
        if (Array.isArray(usersData)) {
          const sortedUsers = usersData.sort((a, b) => b.totalScore - a.totalScore);
          setTopUsers(sortedUsers.slice(0, 10));
        } else {
          console.error("Unexpected data structure:", usersData);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard-container bg-white shadow-lg p-3 h-[225px] w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="leaderboard-title text-sm">Top Leaders</h2>
        <FaTrophy className="leaderboard-icon text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {topUsers.map((user, index) => (
          <div
            className="user-card flex items-center justify-between bg-[#F3F4F6] p-2 hover:bg-[#E2E3E8] transition-colors"
            key={index}
          >
            {/* Left Column: Rank, First Letter */}
            <div className="user-rank flex items-center">
              <div className={`user-avatar w-5 h-5 flex items-center justify-center text-xs text-white ${getRandomColor(user.username)}`}>
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-username ml-2 text-[#1b3647] font-medium text-xs">
                <span className="font-bold">{user.username}</span>
              </div>
            </div>

            {/* Right Column: Score */}
            <div className="user-score flex items-center text-[#1b3647] font-medium text-xs">
              <FaStar className="user-score-icon text-yellow-400 mr-1 text-xs" />
              {user.totalScore}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to generate a random color based on the first letter of the username
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
