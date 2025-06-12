import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

export const SpreadIndicator = ({
  symbol,
  exchangeData
}) => {
  const formatPrice = (price) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 2
      });
    } else if (price >= 1) {
      return price.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      });
    } else {
      return price.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      });
    }
  };
  
  const prices = exchangeData.map(exchange => exchange.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const totalSpread = maxPrice - minPrice;
  const spreadPercentage = minPrice > 0 ? (totalSpread / minPrice) * 100 : 0;
  
  const minExchange = exchangeData.find(exchange => exchange.price === minPrice);
  const maxExchange = exchangeData.find(exchange => exchange.price === maxPrice);
  
  const arbitrageOpportunity = spreadPercentage > 0.1;
  
  return (
    <Card className="bg-[#1e293b] rounded-md border border-[rgba(148,163,184,0.2)]">
      <CardBody>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#f8fafc] leading-7">Exchange Price Spread</h3>
            <div className="flex items-center gap-2">
              <span className="text-[#94a3b8] text-sm leading-5">Total Spread:</span>
              <span className={`font-semibold ${spreadPercentage > 0.5 ? 'text-[#f59e0b]' : 'text-[#f8fafc]'}`}>
                {spreadPercentage.toFixed(4)}%
              </span>
              {arbitrageOpportunity && (
                <div className="bg-[rgba(245,158,11,0.2)] text-[#f59e0b] text-xs leading-4 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Icon icon="lucide:alert-triangle" className="text-xs" />
                  Arbitrage
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exchangeData.map((exchange, index) => {
              const isHighest = exchange.price === maxPrice;
              const isLowest = exchange.price === minPrice;
              const color = isHighest ? "#ef4444" : isLowest ? "#22c55e" : "#38bdf8";
              const position = totalSpread > 0 
                ? ((exchange.price - minPrice) / totalSpread) * 100 
                : 50;
              const percentageChange = minPrice > 0 
                ? ((exchange.price - minPrice) / minPrice) * 100 
                : 0;

              return (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <Icon 
                        icon={`logos:${exchange.name.toLowerCase()}`} 
                        width={20} 
                        height={20}
                        className="mr-1"
                        style={{ color: '#22C55E' }}
                      />
                      <span className="font-medium text-[#f8fafc] text-[0.9375rem] leading-6">{exchange.name}</span>
                    </div>
                    <span className={`font-semibold ${isHighest ? 'text-[#ef4444]' : isLowest ? 'text-[#22c55e]' : 'text-[#f8fafc]'}`}>
                      {formatPrice(exchange.price)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-[rgba(148,163,184,0.2)]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${position}%`,
                          backgroundColor: color,
                          transition: 'width 0.3s ease'
                        }}
                      />
                    </div>
                    <span className={`text-sm leading-5 ${percentageChange > 0 ? 'text-[#22c55e]' : percentageChange < 0 ? 'text-[#ef4444]' : 'text-[#94a3b8]'}`}>
                      {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(4)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {arbitrageOpportunity && maxExchange && minExchange && (
            <div className="mt-4 p-3 bg-[#334155] rounded-md">
              <div className="flex items-center gap-2 text-sm leading-5">
                <Icon icon="lucide:trending-up" className="text-[#22c55e]" style={{ color: '#22C55E' }} />
                <span className="text-[#94a3b8]">Potential arbitrage:</span>
                <span className="font-medium text-[#f8fafc]">Buy on {minExchange.name} at {formatPrice(minPrice)}</span>
                <Icon icon="lucide:arrow-right" className="text-[#94a3b8]" style={{ color: '#22C55E' }} />
                <span className="font-medium text-[#f8fafc]">Sell on {maxExchange.name} at {formatPrice(maxPrice)}</span>
                <span className="ml-auto font-semibold text-[#22c55e]">
                  Profit: {((maxPrice - minPrice) / minPrice * 100).toFixed(4)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default SpreadIndicator;