import React from "react";

const Dropdown = ({ label, items, isOpen, onToggle, onClickItem }) => {
  return (
    <div
      className="relative"
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button className="text-white font-semibold hover:text-[#E50914] transition-colors duration-200">
        {label}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-48 bg-[#1b3647] rounded-md p-2 shadow-md z-10">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => onClickItem(item)}
              className="block text-white py-2 px-3 w-full text-left hover:bg-[#E50914] hover:text-[#0d253f] transition duration-200"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
