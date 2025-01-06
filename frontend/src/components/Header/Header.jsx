import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";
import UserProfile from "./UserProfile";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import "./Header.css";
import apiClient from "../apiInstance/apiInstance";

const Header = ({ toggleMenu, isMenuOpen }) => {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0); // Default score is 0
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const scores = localStorage.getItem("score");

  // Fetch the user profile and score
  const fetchUserProfile = async () => {
    if (!token) return;

    try {
      const response = await apiClient.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setScore(response.data.user.totalScore || 0); // Set the score from the API response
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  // Re-fetch user profile when token or score changes
  useEffect(() => {
    fetchUserProfile();
  }, [token, score, scores]); // Dependencies: token or score change will trigger refetch

  const handleLogout = () => {
    localStorage.removeItem("access");
    setUser(null);
    setScore(0); // Reset score on logout
  };

  return (
    <header className="bg-gray-900 text-white flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 shadow-lg sticky top-0 z-50 transition-all duration-300 ease-in-out">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleMenu}
        className="text-white sm:hidden transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Navigation Menu */}
      <nav
        className={`${
          isMenuOpen ? "block opacity-100" : "hidden sm:block opacity-100"
        } sm:flex flex-col sm:flex-row items-center w-full sm:w-auto bg-black sm:bg-transparent transition-all duration-300 ease-in-out`}
      >
        <NavMenu navigate={navigate} userId={user ? user.user._id : null} />
      </nav>

      {/* User Profile */}
      <UserProfile
        user={user}
        score={score}
        onLogin={() => setShowLoginModal(true)}
        onRegister={() => setShowRegisterModal(true)}
        onLogout={handleLogout}
      />

      {/* Login & Register Modals */}
      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
      {showRegisterModal && <Register onClose={() => setShowRegisterModal(false)} />}
    </header>
  );
};

export default Header;
