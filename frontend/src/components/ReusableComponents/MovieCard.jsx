import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const MovieCard = ({ movie }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCardClick = (e) => {
    if (showMenu) {
      e.stopPropagation();
      return;
    }
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden cursor-pointer" style={{ width: "200px" }} onClick={handleCardClick}>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
        alt={movie.title || movie.name}
        className="w-full h-64 object-cover"
      />

      <div className="absolute top-2 right-2 flex z-30">
        <button className="text-gray-700 hover:text-gray-900 bg-white rounded-full p-1 shadow-md" onClick={(e) => { e.stopPropagation(); toggleMenu(e); }}>
          <FaEllipsisV />
        </button>
      </div>

      <div className="p-3 text-center">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{movie.title || movie.name}</h3>
        <p className="text-xs text-gray-500">{movie.release_date || movie.first_air_date || "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
