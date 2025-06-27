import React from 'react';

const StatItem = ({ label, value, change, changeColor = 'text-green-600' }) => (
    <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="flex items-baseline space-x-2">
            <span className="text-sm font-semibold text-gray-800">{value}</span>
            {change && <span className={`text-xs font-semibold ${changeColor}`}>{change}</span>}
        </div>
    </div>
);

const MarketStatsBar = () => {
  return (
    <div className="bg-gradient-to-r from-white to-emerald-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-6 overflow-x-auto">
                    <StatItem label="Cryptos" value="2.4M+" />
                    <StatItem label="Exchanges" value="760" />
                    <StatItem label="Market Cap" value="$1.67T" change="+2.3%" />
                    <StatItem label="24h Vol" value="$89.2B" change="-5.1%" changeColor="text-red-600" />
                    <StatItem label="Dominance" value="BTC: 50.7% ETH: 18.6%" />
                </div>
                <div className="hidden md:flex items-center space-x-2">
                    <span className="text-xs text-gray-500">🔥 Trending:</span>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Solana</a>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Cardano</a>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Polygon</a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MarketStatsBar; 