import React from 'react';
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

// Функция для форматирования чисел до 4 знаков после запятой
const formatNumber = (num) => Number(num.toFixed(4));

const SummaryCard = ({ data, timeframe }) => {
    const summary = {
        volume: {
            value: 2.5,
            change: 12.5,
            trend: 'up'
        },
        trades: {
            value: 156,
            change: 8.2,
            trend: 'up'
        },
        liquidity: {
            value: 1.2,
            change: -3.1,
            trend: 'down'
        }
    };

    // Проверяем, что data и data[exchange][timeframe] существуют
    const exchangeData = data?.binance?.[timeframe] || [];

    // Если данных нет, отображаем сообщение
    if (!exchangeData || exchangeData.length === 0) {
        return (
            <Card className="bg-content1/40 backdrop-blur-md border border-white/10">
                <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Volume */}
                        <div className="p-4 rounded-lg bg-content2/50">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-gray-400">Volume</h4>
                                <Icon
                                    icon={summary.volume.trend === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'}
                                    className={`w-5 h-5`}
                                    style={{ color: '#22C55E' }}
                                />
                            </div>
                            <p className="text-2xl font-bold text-white">${summary.volume.value}B</p>
                            <p className={`text-sm mt-1 ${
                                summary.volume.trend === 'up' ? 'text-green-500' : 'text-red-500'
                            }`}>
                                {summary.volume.trend === 'up' ? '+' : ''}{summary.volume.change}%
                            </p>
                        </div>

                        {/* Trades */}
                        <div className="p-4 rounded-lg bg-content2/50">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-gray-400">Trades</h4>
                                <Icon
                                    icon={summary.trades.trend === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'}
                                    className={`w-5 h-5`}
                                    style={{ color: '#22C55E' }}
                                />
                            </div>
                            <p className="text-2xl font-bold text-white">{summary.trades.value}K</p>
                            <p className={`text-sm mt-1 ${
                                summary.trades.trend === 'up' ? 'text-green-500' : 'text-red-500'
                            }`}>
                                {summary.trades.trend === 'up' ? '+' : ''}{summary.trades.change}%
                            </p>
                        </div>

                        {/* Liquidity */}
                        <div className="p-4 rounded-lg bg-content2/50">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-gray-400">Liquidity</h4>
                                <Icon
                                    icon={summary.liquidity.trend === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'}
                                    className={`w-5 h-5`}
                                    style={{ color: '#22C55E' }}
                                />
                            </div>
                            <p className="text-2xl font-bold text-white">${summary.liquidity.value}B</p>
                            <p className={`text-sm mt-1 ${
                                summary.liquidity.trend === 'up' ? 'text-green-500' : 'text-red-500'
                            }`}>
                                {summary.liquidity.trend === 'up' ? '+' : ''}{summary.liquidity.change}%
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>
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
        <Card className="bg-content1/40 backdrop-blur-md border border-white/10">
            <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Volume */}
                    <div className="p-4 rounded-lg bg-content2/50">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-gray-400">Volume</h4>
                            <Icon
                                icon={summary.volume.trend === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'}
                                className={`w-5 h-5`}
                                style={{ color: '#22C55E' }}
                            />
                        </div>
                        <p className="text-2xl font-bold text-white">${volume}B</p>
                        <p className={`text-sm mt-1 ${
                            percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                            {percentageChange >= 0 ? '+' : ''}{percentageChange}%
                        </p>
                    </div>

                    {/* Trades */}
                    <div className="p-4 rounded-lg bg-content2/50">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-gray-400">Trades</h4>
                            <Icon
                                icon={summary.trades.trend === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'}
                                className={`w-5 h-5`}
                                style={{ color: '#22C55E' }}
                            />
                        </div>
                        <p className="text-2xl font-bold text-white">{summary.trades.value}K</p>
                        <p className={`text-sm mt-1 ${
                            summary.trades.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}>
                            {summary.trades.trend === 'up' ? '+' : ''}{summary.trades.change}%
                        </p>
                    </div>

                    {/* Liquidity */}
                    <div className="p-4 rounded-lg bg-content2/50">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-gray-400">Liquidity</h4>
                            <Icon
                                icon={summary.liquidity.trend === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'}
                                className={`w-5 h-5`}
                                style={{ color: '#22C55E' }}
                            />
                        </div>
                        <p className="text-2xl font-bold text-white">${summary.liquidity.value}B</p>
                        <p className={`text-sm mt-1 ${
                            summary.liquidity.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}>
                            {summary.liquidity.trend === 'up' ? '+' : ''}{summary.liquidity.change}%
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default SummaryCard;