import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../apiInstance/apiInstance";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message
    try {
      const response = await apiClient.post("/login", { email, password });
      localStorage.setItem("access", response.data.token);
      window.location.reload();
    } catch (error) {
      // Only set the error message, without logging it to the console
      if (error.response?.status === 400) {
        setError("Invalid email or password. Please try again.");
        return;
      } else {
        setError("An unexpected error occurred. Please try again later.");
        return;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-5 rounded-lg shadow-lg max-w-xs w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Login
        </h2>
        {error && <div className="text-red-500 text-xs mb-3">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded-md hover:bg-blue-700 transition duration-200 text-sm"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-3 text-xs text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
