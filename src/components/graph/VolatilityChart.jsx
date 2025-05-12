import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const VolatilityChart = ({ data, timeframe, exchange }) => {
    // Проверяем, что данные существуют
    const exchangeData = exchange === 'general'
        ? data?.general?.[timeframe] || []
        : data?.[exchange]?.[timeframe] || [];

    // Если данных нет, отображаем сообщение
    if (!exchangeData || exchangeData.length === 0) {
        return (
            <div className="bg-[#1e1e2f] rounded-md mt-3 p-4">
                <p className="text-gray-400">No data available for {timeframe}</p>
            </div>
        );
    }

    // Извлекаем цены закрытия
    const prices = exchangeData.map(d => d.close);
    const windowSize = timeframe === '1m' ? 10 : timeframe === '1h' ? 6 : 3;
    const volatilityData = prices.map((_, index) => {
        if (index < windowSize) return null;
        const window = prices.slice(index - windowSize, index);
        const mean = window.reduce((sum, val) => sum + val, 0) / windowSize;
        const variance = window.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / windowSize;
        const stdDev = Math.sqrt(variance);
        return {
            time: exchangeData[index].time,
            volatility: stdDev,
        };
    }).filter(d => d !== null);

    // Форматирование времени для XAxis
    const formatTime = (time) => {
        const date = new Date(time);
        if (timeframe === '1m') {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (timeframe === '1h') {
            return date.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' });
        } else {
            return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
        }
    };

    return (
        <div className="bg-[#1e1e2f] rounded-md mt-3">
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={volatilityData}>
                    <XAxis dataKey="time" tickFormatter={formatTime} />
                    <YAxis />
                    <Tooltip formatter={(value) => value.toFixed(4)} />
                    <Line type="monotone" dataKey="volatility" stroke="#0d9488" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VolatilityChart;