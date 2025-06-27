import React, { useState, useCallback, useMemo } from 'react';
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Area,
    ReferenceLine,
    CartesianGrid,
} from 'recharts';

function MainChart({ ohlcData = [], trendData = [], showTrend = true }) {
    const [crosshair, setCrosshair] = useState(null);

    const displayData = useMemo(() => {
        if (!ohlcData || ohlcData.length === 0) return [];
        const sortedData = [...ohlcData].sort((a, b) => new Date(a.time) - new Date(b.time));
        const displayTrendData = showTrend && trendData ?
            trendData.filter(t => ohlcData.some(o => o.time === t.time)) :
            [];

        return sortedData.map(o => {
            const trendPoint = displayTrendData.find(t => t.time === o.time);
            return {
                ...o,
                ...(trendPoint && { avg_price: trendPoint.avg_price }),
            };
        });
    }, [ohlcData, trendData, showTrend]);
    
    const yDomain = useMemo(() => {
        if (!ohlcData || ohlcData.length === 0) {
            return ['auto', 'auto'];
        }

        const lows = ohlcData.map(p => p.low);
        const highs = ohlcData.map(p => p.high);

        if (lows.length === 0 || highs.length === 0) {
            return ['auto', 'auto'];
        }

        const min = Math.min(...lows);
        const max = Math.max(...highs);

        const padding = (max - min) * 0.15; // Increased padding a bit

        return [min - padding, max + padding];
    }, [ohlcData]);


    const handleMouseMove = (e) => {
        if (e.activePayload && e.activePayload.length) {
            const payload = e.activePayload[0].payload;
            setCrosshair({
                time: payload.time,
                price: payload.close,
            });
        }
    };

    const handleMouseLeave = () => {
        setCrosshair(null);
    };

    const formatTime = (timeStr) => {
        const date = new Date(timeStr);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const CustomCursor = ({ points, width, height }) => {
        const { x, y } = points[0];
        return (
            <g>
                <line x1={x} y1={0} x2={x} y2={height} stroke="#525252" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={0} y1={y} x2={width} y2={y} stroke="#525252" strokeWidth={1} strokeDasharray="3 3" />
            </g>
        );
    };
    
    const tooltipFormatter = (value, name, props) => {
      // This can be simplified or removed if the custom content is used
      return null;
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
                data={displayData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <defs>
                    <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tickFormatter={formatTime} tick={{ fill: '#374151', fontSize: 12 }} stroke="#d1d5db" />
                <YAxis
                    orientation="right"
                    yAxisId="right"
                    domain={yDomain}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                    tick={{ fill: '#374151', fontSize: 12 }}
                    stroke="#d1d5db"
                />
                <Tooltip
                    cursor={false}
                    formatter={tooltipFormatter}
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            const { open, high, low, close } = payload[0].payload;
                            const trendPoint = displayData.find(item => item.time === label);
                            return (
                                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 p-2 rounded-md shadow-lg text-xs">
                                    <p className="font-semibold text-gray-800 mb-1">{formatTime(label)}</p>
                                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                                        <p className="text-gray-600"><span className="font-medium text-gray-500">O:</span> {open.toFixed(2)}</p>
                                        <p className="text-gray-600"><span className="font-medium text-gray-500">H:</span> {high.toFixed(2)}</p>
                                        <p className="text-gray-600"><span className="font-medium text-gray-500">L:</span> {low.toFixed(2)}</p>
                                        <p className="text-gray-600"><span className="font-medium text-gray-500">C:</span> {close.toFixed(2)}</p>
                                    </div>
                                    {showTrend && trendPoint && trendPoint.avg_price && (
                                        <>
                                            <div className="border-t border-gray-200 my-1"></div>
                                            <p className="text-orange-500 font-medium">
                                                Trend: {trendPoint.avg_price.toFixed(2)}
                                            </p>
                                        </>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Area type="monotone" dataKey="close" stroke="#3b82f6" fill="url(#colorClose)" strokeWidth={2} yAxisId="right" />
                
                {showTrend && <Line type="monotone" dataKey="avg_price" stroke="#f97316" strokeWidth={2} dot={false} yAxisId="right" connectNulls={false} />}
                
                {crosshair && (
                  <>
                    <ReferenceLine x={crosshair.time} stroke="#6b7280" strokeDasharray="3 3" />
                    <ReferenceLine y={crosshair.price} yAxisId="right" stroke="#6b7280" strokeDasharray="3 3" />
                  </>
                )}
            </ComposedChart>
        </ResponsiveContainer>
    );
}

export default MainChart;