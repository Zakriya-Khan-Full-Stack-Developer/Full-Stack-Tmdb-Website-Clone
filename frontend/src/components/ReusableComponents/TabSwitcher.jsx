import React from "react";

const TabSwitcher = ({ title, tabs, activeTab, activeColor = "bg-teal-600", textColor = "text-white", onTabChange }) => {
  return (
    <div className="mb-4 sm:mb-4 md:mb-6">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h2 className="text-lg sm:text-sm md:text-2xl font-semibold">{title}</h2>

        {/* Tabs */}
        <div className="flex items-center p-1 bg-transparent rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)} // Notify parent of tab change
              className={`px-3 py-1 sm:px-2 sm:py-1 text-xs sm:text-sm md:text-sm font-semibold rounded-full transition-all duration-300 ${
                activeTab === tab.value
                  ? `${activeColor} ${textColor}` // Active tab styles
                  : "bg-transparent text-gray-300 hover:bg-gray-500" // Inactive tab styles
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabSwitcher;
