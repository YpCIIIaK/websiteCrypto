import React from 'react'
import { Search } from 'lucide-react'
import SearchSuggestions from './SearchSuggestions'

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  showSuggestions, 
  setShowSuggestions,
  suggestions,
  onSuggestionClick 
}) => {
  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
        <input
          type="text"
          placeholder="Search coins, exchanges, NFT collections..."
          className="w-96 h-12 pl-12 pr-4 bg-white/90 backdrop-blur-sm border-2 border-emerald-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-lg text-lg outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
      </div>
      
      {showSuggestions && searchTerm && (
        <SearchSuggestions 
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
          onClose={() => setShowSuggestions(false)}
        />
      )}
    </div>
  )
}

export default SearchBar 