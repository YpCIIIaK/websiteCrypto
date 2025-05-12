import React, { useState, useCallback } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    ReferenceDot,
} from 'recharts';

const MainChart = ({ data, chartType, options, showTrend, trendData, timeframe }) => {
    const chartColor = '#3b82f6'; // Blue-500 for main line
    const trendColor = '#f97316'; // Orange-500 for trend line

    const [activePrice, setActivePrice] = useState(null);

    // Проверка данных
    if (!data || data.length === 0) {
        console.warn(`No data for ${timeframe} timeframe`);
        return <div className="w-full h-[470px] flex items-center justify-center text-gray-800">No data available</div>;
    }

    const minLow = Math.min(...data.map(d => d.low));
    const maxHigh = Math.max(...data.map(d => d.high));
    const margin = (maxHigh - minLow) * 0.05;
    const yDomain = [minLow - margin, maxHigh + margin];

    const syncedTrendData = trendData && data.length > 0
        ? trendData.filter(trend => data.some(d => d.time === trend.time))
        : [];

    const formatTime = (time) => {
        if (!time) return '';
        const date = new Date(time);
        if (isNaN(date)) return time;
        if (timeframe === '1m' || timeframe === '1h') {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        }
        return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    };

    const CustomCursor = (props) => {
        const { x, height, width } = props;
        if (isNaN(x) || isNaN(width)) {
            console.warn('Invalid cursor props:', props);
            return null;
        }
        return (
            <line
                x1={x + width / 2}
                x2={x + width / 2}
                y1={0}
                y2={height}
                stroke="#e5e7eb" // Gray-200
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.8}
            />
        );
    };

    const tooltipFormatter = (value, name, props) => {
        const { payload } = props;
        if (name === 'open') return [`Open: ${value.toFixed(4)}`, ''];
        if (name === 'close') return [`Close: ${payload.close.toFixed(4)}`, ''];
        if (name === 'avg_price') return [`Trend: ${value.toFixed(4)}`, ''];
        return value.toFixed(4);
    };

    const handleTooltip = useCallback(({ active, payload }) => {
        if (active && payload && payload.length) {
            setActivePrice(payload[0].payload.close);
        } else {
            setActivePrice(null);
        }
    }, []);

    const CustomPriceLabel = () => {
        const lastPoint = data[data.length - 1];
        const x = new Date(lastPoint.time).getTime();
        if (isNaN(x)) {
            console.warn('Invalid timestamp for CustomPriceLabel:', lastPoint.time);
            return null;
        }
        return (
            <g>
                <rect
                    x={x}
                    y={lastPoint.close - 15}
                    width={70}
                    height={24}
                    fill="#1f2937" // Gray-800
                    stroke="#4b5563" // Gray-600
                    strokeWidth={1}
                    rx={4} // Rounded corners
                />
                <text
                    x={x + 35}
                    y={lastPoint.close}
                    textAnchor="middle"
                    fill="#ffffff" // White text
                    fontSize={12}
                    fontWeight={500}
                >
                    {lastPoint.close.toFixed(4)}
                </text>
            </g>
        );
    };

    // Ограничение количества точек
    const maxPoints = 1000;
    const displayData = data.length > maxPoints ? data.slice(-maxPoints) : data;
    const displayTrendData = syncedTrendData.length > maxPoints ? syncedTrendData.slice(-maxPoints) : syncedTrendData;

    return (
        <div className="w-full h-[470px] bg-white rounded-xl shadow-md overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={displayData}
                    margin={{ top: 20, right: 40, left: 20, bottom: 10 }}
                >
                    <CartesianGrid
                        stroke="#e5e7eb" // Gray-200
                        strokeOpacity={0.5}
                        vertical={false}
                    />
                    <XAxis
                        dataKey="time"
                        tickFormatter={formatTime}
                        tick={{ fill: '#1f2937', fontSize: 12 }} // Gray-800
                        stroke="#e5e7eb" // Gray-200
                        interval="preserveStartEnd"
                        minTickGap={30}
                        tickCount={10}
                    />
                    <YAxis
                        domain={yDomain}
                        orientation="right"
                        tickFormatter={(value) => value.toFixed(4)}
                        tick={{ fill: '#1f2937', fontSize: 12 }} // Gray-800
                        stroke="#e5e7eb" // Gray-200
                    />
                    <Tooltip
                        cursor={<CustomCursor />}
                        formatter={tooltipFormatter}
                        content={({ active, payload, label }) => {
                            handleTooltip({ active, payload });
                            if (active && payload && payload.length) {
                                const { open, close } = payload[0].payload;
                                const trendPoint = displayTrendData.find(item => item.time === label);
                                return (
                                    <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-md text-sm">
                                        <p className="text-gray-600 font-medium">{formatTime(label)}</p>
                                        <p className="text-gray-800">Open: {open.toFixed(4)}</p>
                                        <p className="text-gray-800">Close: {close.toFixed(4)}</p>
                                        {showTrend && trendPoint && (
                                            <p className="text-orange-600">
                                                Trend: {trendPoint.avg_price.toFixed(4)}
                                            </p>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="close"
                        stroke={chartColor}
                        strokeWidth={2}
                        dot={false}
                        tension={0}
                        activeDot={{ r: 6, fill: chartColor, stroke: '#1f2937', strokeWidth: 2 }}
                    />
                    {showTrend && displayTrendData.length > 0 && (
                        <Line
                            type="monotone"
                            dataKey="avg_price"
                            data={displayTrendData}
                            stroke={trendColor}
                            strokeWidth={2}
                            dot={false}
                            tension={0}
                            activeDot={{ r: 6, fill: trendColor, stroke: '#1f2937', strokeWidth: 2 }}
                        />
                    )}
                    {activePrice && (
                        <ReferenceLine
                            y={activePrice}
                            stroke="#d1d5db" // Gray-300
                            strokeDasharray="4 4"
                            strokeWidth={1}
                            opacity={0.8}
                        />
                    )}
                    {displayData.length > 0 && (
                        <ReferenceDot
                            x={displayData[displayData.length - 1].time}
                            y={displayData[displayData.length - 1].close}
                            r={5}
                            fill={chartColor}
                            stroke="#1f2937" // Gray-800
                            strokeWidth={2}
                            shape={CustomPriceLabel}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MainChart;