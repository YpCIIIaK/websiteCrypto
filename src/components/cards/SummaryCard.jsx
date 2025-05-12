import React from 'react';

// Функция для форматирования чисел до 4 знаков после запятой
const formatNumber = (num) => Number(num.toFixed(4));

const SummaryCard = ({ data, timeframe }) => {
    // Проверяем, что data и data[exchange][timeframe] существуют
    const exchangeData = data?.binance?.[timeframe] || [];

    // Если данных нет, отображаем сообщение
    if (!exchangeData || exchangeData.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
                <p className="text-gray-600">No data available for {timeframe}</p>
            </div>
        );
    }

    // Извлекаем последние данные для отображения
    const lastData = exchangeData[exchangeData.length - 1];
    const high = formatNumber(Math.max(...exchangeData.map(d => d.high)));
    const low = formatNumber(Math.min(...exchangeData.map(d => d.low)));
    const volume = formatNumber(exchangeData.reduce((sum, d) => sum + d.volume, 0));
    const percentageChange = exchangeData.length > 1
        ? formatNumber(((lastData.close - exchangeData[exchangeData.length - 2].close) / exchangeData[exchangeData.length - 2].close) * 100)
        : 0;

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800">Summary ({timeframe})</h2>
            <div className="mt-2 space-y-2">
                <p className="text-gray-600">
                    Last Price: <span className="font-medium">${formatNumber(lastData.close)}</span>
                </p>
                <p className="text-gray-600">
                    High: <span className="font-medium">${high}</span>
                </p>
                <p className="text-gray-600">
                    Low: <span className="font-medium">${low}</span>
                </p>
                <p className="text-gray-600">
                    Volume: <span className="font-medium">{volume}</span>
                </p>
                <p className="text-gray-600">
                    Change: <span className={`font-medium ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {percentageChange >= 0 ? '+' : ''}{percentageChange}%
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SummaryCard;