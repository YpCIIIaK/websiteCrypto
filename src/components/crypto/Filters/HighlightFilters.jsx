import React from 'react';

const HighlightFilters = () => {
  return (
    <div className="flex space-x-2 my-4">
      <div className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-700">
        🔥 Top Gainers
      </div>
      <div className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-700">
        😡 Top Losers
      </div>
       <div className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-700">
        ✨ New
      </div>
    </div>
  );
};

export default HighlightFilters; 