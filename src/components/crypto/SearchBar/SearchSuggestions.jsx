import React from 'react'
import { formatPrice, formatPercent } from '../../../utils/formatters'

const SearchSuggestions = ({ suggestions, onSuggestionClick, onClose }) => {
  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-80 overflow-y-auto z-50">
      {suggestions.slice(0, 5).map((crypto) => (
        <div
          key={crypto.symbol}
          className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
          onClick={() => {
            onSuggestionClick(crypto)
            onClose()
          }}
        >
          <img 
            src={crypto.icon || "/placeholder.svg"} 
            alt={crypto.name} 
            className="w-8 h-8 rounded-full" 
          />
          <div className="flex-1 flex justify-between items-center">
            <div>
              <div className="font-semibold text-gray-900">{crypto.name}</div>
              <div className="text-sm text-gray-500 uppercase">{crypto.symbol}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{formatPrice(crypto.price)}</div>
              <div className={`text-sm ${crypto.change24h >= 0 ? "text-teal-600" : "text-red-600"}`}>
                {formatPercent(crypto.change24h)}
              </div>
            </div>
          </div>
        </div>
      ))}
      {suggestions.length === 0 && (
        <div className="p-3 text-gray-500 text-center">No results found</div>
      )}
    </div>
  )
}

export default SearchSuggestions 