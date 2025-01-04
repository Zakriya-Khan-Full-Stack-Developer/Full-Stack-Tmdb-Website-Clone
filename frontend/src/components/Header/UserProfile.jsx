import React, { useState } from "react";
import { FaCoins } from "react-icons/fa"; // Importing the coin icon

const UserProfile = ({ user, score, onLogin, onRegister, onLogout, onRefetch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Extract the first letter of the user's username
  const userInitial = user?.user?.username?.charAt(0).toUpperCase();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-8">
      {user ? (
        <div className="relative flex items-center gap-6 text-lg font-semibold text-white">
          {/* Displaying total score with coin icon */}
          <div className="flex items-center gap-2">
            <FaCoins className="text-yellow-500 text-xl" /> {/* Coin icon */}
            <span>{score || 0} Coins</span>
          </div>

          {/* User avatar with initial */}
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold cursor-pointer relative"
            title={user.user.username} // Tooltip showing full name
            onClick={toggleDropdown}
          >
            {userInitial}
          </div>

          {/* Dropdown menu with animation */}
          {isDropdownOpen && (
            <div
              className={`absolute top-14 right-0 bg-white text-black shadow-md rounded-md w-36 z-10 transition-all duration-200 ease-in-out ${
                isDropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center rounded-t-md"
                onClick={onLogout}
              >
                Logout
              </div>
              
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <button
            onClick={onLogin}
            className="text-white font-semibold text-lg hover:text-[#E50914] transition-colors duration-200"
          >
            Login
          </button>
          <span className="text-white text-lg">/</span>
          <button
            onClick={onRegister}
            className="text-white font-semibold text-lg hover:text-[#E50914] transition-colors duration-200"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
