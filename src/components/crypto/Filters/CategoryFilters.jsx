import React from 'react';

const CategoryFilters = ({ activeCategory, setActiveCategory }) => {
  const categories = ['All', 'DeFi', 'NFT', 'Metaverse', 'Gaming'];
  return (
    <div className="flex space-x-2 my-4">
      {categories.map(category => (
        <button 
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            activeCategory === category 
            ? 'bg-emerald-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters; 