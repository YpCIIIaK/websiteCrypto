import React from 'react'
import CoinRow from './CoinRow'

const CoinTable = ({ data, favorites, onToggleFavorite, onCoinClick }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-center p-3 font-semibold text-gray-700">#</th>
              <th className="p-3"></th>
              <th className="text-left p-3 font-semibold text-gray-700 min-w-[200px]">Name</th>
              <th className="text-right p-3 font-semibold text-gray-700">Price</th>
              <th className="text-right p-3 font-semibold text-gray-700">1h %</th>
              <th className="text-right p-3 font-semibold text-gray-700">24h %</th>
              <th className="text-right p-3 font-semibold text-gray-700">7d %</th>
              <th className="text-right p-3 font-semibold text-gray-700">24h Volume</th>
              <th className="text-right p-3 font-semibold text-gray-700">Market Cap</th>
              <th className="text-center p-3 font-semibold text-gray-700 w-32">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {data.map((crypto) => (
              <CoinRow
                key={crypto.rank}
                crypto={crypto}
                isFavorite={favorites.includes(crypto.symbol)}
                onToggleFavorite={onToggleFavorite}
                onCoinClick={onCoinClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CoinTable 