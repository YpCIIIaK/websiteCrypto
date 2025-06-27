import React from 'react'
import { Star } from 'lucide-react'
import { formatPrice, formatPercent, formatNumber } from '../../../utils/formatters'
import Sparkline from './Sparkline'

const CoinRow = ({ crypto, isFavorite, onToggleFavorite, onCoinClick }) => {
  return (
    <tr 
      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => onCoinClick(crypto)}
    >
      <td className="text-center text-gray-500 font-medium p-3">{crypto.rank}</td>
      <td className="p-3">
        <button
          className="p-1 hover:bg-yellow-100 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(crypto.symbol)
          }}
        >
          <Star 
            className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} 
          />
        </button>
      </td>
      <td className="p-3">
        <div className="flex items-center space-x-3">
          <img 
            src={crypto.icon || "/placeholder.svg"} 
            alt={crypto.name} 
            className="w-6 h-6 rounded-full" 
          />
          <div>
            <div className="font-semibold text-gray-900">{crypto.name}</div>
            <div className="text-sm text-gray-500 uppercase">{crypto.symbol}</div>
          </div>
        </div>
      </td>
      <td className="text-right font-semibold text-gray-900 p-3">
        {formatPrice(crypto.price)}
      </td>
      <td className={`text-right font-semibold p-3 ${crypto.change1h >= 0 ? "text-green-600" : "text-red-600"}`}>
        {formatPercent(crypto.change1h)}
      </td>
      <td className={`text-right font-semibold p-3 ${crypto.change24h >= 0 ? "text-teal-600" : "text-red-600"}`}>
        {formatPercent(crypto.change24h)}
      </td>
      <td className={`text-right font-semibold p-3 ${crypto.change7d >= 0 ? "text-green-600" : "text-red-600"}`}>
        {formatPercent(crypto.change7d)}
      </td>
      <td className="text-right font-semibold text-gray-900 p-3">
        {formatNumber(crypto.volume24h)}
      </td>
      <td className="text-right font-semibold text-gray-900 p-3">
        {formatNumber(crypto.marketCap)}
      </td>
      <td className="text-center p-3">
        <div className="w-24 h-12 mx-auto">
          <Sparkline data={crypto.sparkline} positive={crypto.change7d >= 0} />
        </div>
      </td>
    </tr>
  )
}

export default CoinRow 