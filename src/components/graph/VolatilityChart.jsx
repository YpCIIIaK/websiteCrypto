import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../cards/Card";

// Вспомогательная функция для генерации моковых данных о волатильности за последние 30 дней
const generateVolatilityData = () => {
    const data = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const volatility = Math.random(); // Случайное значение от 0 до 1
        data.push({
            date: date.toISOString().split('T')[0],
            volatility,
        });
    }
    return data;
};

const VolatilityChart = () => {
    const data = generateVolatilityData();

    // Функция для определения цвета квадрата в зависимости от уровня волатильности
    const getVolatilityColor = (volatility) => {
        if (volatility > 0.75) return 'bg-green-600/80 hover:bg-green-600';
        if (volatility > 0.5) return 'bg-green-500/80 hover:bg-green-500';
        if (volatility > 0.25) return 'bg-green-400/80 hover:bg-green-400';
        return 'bg-green-300/80 hover:bg-green-300';
    };

    // Функция для текстового описания уровня волатильности
    const getVolatilityLevel = (volatility) => {
        if (volatility > 0.75) return 'High';
        if (volatility > 0.5) return 'Medium';
        if (volatility > 0.25) return 'Low';
        return 'Very Low';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>30-Day Volatility</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-10 gap-1.5">
                    {data.map((day, index) => (
                        <div key={index} className="relative group">
                            <div
                                className={`w-full aspect-square rounded-sm transition-colors ${getVolatilityColor(day.volatility)}`}
                            />
                            {/* Кастомный тултип */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max hidden group-hover:block bg-gray-800 text-white text-xs rounded-md py-1 px-2 z-20 shadow-lg pointer-events-none">
                                <span className="font-semibold">{day.date}</span>
                                <br />
                                <span>{`${getVolatilityLevel(day.volatility)} (${(day.volatility * 100).toFixed(0)}%)`}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-end space-x-4 mt-4 text-xs text-gray-500">
                    <span>Low</span>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm bg-green-300/80" />
                        <div className="w-3 h-3 rounded-sm bg-green-400/80" />
                        <div className="w-3 h-3 rounded-sm bg-green-500/80" />
                        <div className="w-3 h-3 rounded-sm bg-green-600/80" />
                    </div>
                    <span>High</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default VolatilityChart;