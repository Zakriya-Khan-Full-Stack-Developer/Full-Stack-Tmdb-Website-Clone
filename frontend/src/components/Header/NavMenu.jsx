import React, { useState } from "react";
import Dropdown from "./DropDown";
import { toast } from "react-toastify";

const NavMenu = ({ navigate, userId }) => {
  const [dropdownState, setDropdownState] = useState({
    movies: false,
    tv: false,
  });

  const categories = {
    movies: ["Upcoming", "Now_Playing", "Popular", "Top_Rated"],
    tv: ["Popular", "Top_Rated", "Upcoming"],
  };

  // Toggle the dropdown state
  const toggleDropdown = (dropdown, isOpen) => {
    setDropdownState((prev) => ({ ...prev, [dropdown]: isOpen }));
  };

  // Handle Play Quiz click
  const handlePlayQuiz = () => {
    if (!userId) {
      toast.error("You must be logged in to play the quiz.");
      return;
    }
    navigate("/quiz");
  };

  // Handle category navigation with page parameter
  const handleCategoryClick = (category, categoryType, page = 1) => {
    const normalizedCategory = category.toLowerCase().replace(" ", "-");
    navigate(`/list/${categoryType}/${normalizedCategory}/${page}`);
  };

  return (
    <nav className="flex items-center gap-4 text-[12px] sm:text-[14px] font-medium tracking-wide bg-gray-900 py-2 px-3 sm:px-6 rounded-md">
      {/* Watch Here - Navigates to the Root */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-1 cursor-pointer"
      >
        <span className="text-[#1db954] font-extrabold text-lg sm:text-xl tracking-wide">
          Watch Here
        </span>
        <div className="w-2 h-2 rounded-full bg-[#1db954]"></div>
      </div>

      {/* Movies Dropdown */}
      <Dropdown
        label="Movies"
        items={categories.movies}
        isOpen={dropdownState.movies}
        onToggle={(isOpen) => toggleDropdown("movies", isOpen)}
        onClickItem={(category) =>
          handleCategoryClick(category, "movie") // Passing type as 'movie'
        }
      />

      {/* TV Shows Dropdown */}
      <Dropdown
        label="TV Shows"
        items={categories.tv}
        isOpen={dropdownState.tv}
        onToggle={(isOpen) => toggleDropdown("tv", isOpen)}
        onClickItem={(category) =>
          handleCategoryClick(category, "tv") // Passing type as 'tv'
        }
      />

      {/* Popular People */}
      <button
        onClick={() => navigate("/popular-people")}
        className="text-white text-sm font-semibold hover:text-[#1db954] transition-colors duration-200"
      >
        Popular People
      </button>

      {/* Play Quiz */}
      <button
        onClick={handlePlayQuiz} // Handle Play Quiz button click
        className="text-white text-sm font-semibold hover:text-[#1db954] transition-colors duration-200"
      >
        Play Quiz
      </button>
    </nav>
  );
};

export default NavMenu;
