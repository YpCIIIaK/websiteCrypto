import React from 'react';

const SentimentChart = ({ data }) => {
    if (!data || data.length < 2) return null;

    // Вычисляем изменение цены в процентах
    const current = data[data.length - 1].close;
    const previous = data[data.length - 2].close;
    const priceChange = ((current - previous) / previous) * 100;

    // Настроение
    let sentimentValues;
    if (priceChange > 1) {
        sentimentValues = { buy: 14, sell: 4, neutral: 8 };
    } else if (priceChange < -1) {
        sentimentValues = { buy: 4, sell: 14, neutral: 8 };
    } else {
        sentimentValues = { buy: 8, sell: 8, neutral: 10 };
    }

    // Угол поворота стрелки
    const maxChange = 5;
    const angle = Math.max(-90, Math.min(90, (priceChange / maxChange) * 90));

    return (
        <div className="flex flex-col items-center h-[200px] bg-[#1e1e2f] rounded-md w-full">
            <div
                className="mt-3 relative w-48 h-24 rounded-t-full overflow-hidden"
                style={{
                    background: 'linear-gradient(90deg, #ef4444 0%, #22c55e 100%)',
                }}
            >
                <div
                    className="rounded-sm absolute w-1 h-15 bg-white top-1/2 left-1/2 origin-bottom"
                    style={{
                        transform: `translate(-50%, 0) rotate(${angle}deg)`,
                        transition: 'transform 0.3s ease',
                    }}
                />
            </div>

            <div className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
                {priceChange > 1 ? 'Buy' : priceChange < -1 ? 'Sell' : 'Neutral'}
            </div>

            <div className="mt-2 flex justify-between w-full max-w-xs text-sm">
                <div className="text-center">
                    <span className="block text-red-500">Sell</span>
                    <span className="block text-gray-800 dark:text-white">{sentimentValues.sell}</span>
                </div>
                <div className="text-center">
                    <span className="block text-gray-500">Neutral</span>
                    <span className="block text-gray-800 dark:text-white">{sentimentValues.neutral}</span>
                </div>
                <div className="text-center">
                    <span className="block text-blue-500">Buy</span>
                    <span className="block text-gray-800 dark:text-white">{sentimentValues.buy}</span>
                </div>
            </div>
        </div>
    );
};

export default SentimentChart;
