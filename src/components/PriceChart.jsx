import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Settings } from 'lucide-react';
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

const IndicatorDropdown = ({
    showBollingerBands, setShowBollingerBands,
    showMovingAverage, setShowMovingAverage,
    showTrend, setShowTrend
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 py-1 px-3 rounded text-sm bg-slate-100 hover:bg-slate-200 transition-all"
            >
                <Settings size={16} />
                Indicators
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-slate-200">
                    <label className="flex items-center gap-2 p-2 hover:bg-slate-50 cursor-pointer">
                        <input type="checkbox" checked={showBollingerBands} onChange={(e) => setShowBollingerBands(e.target.checked)} className="w-4 h-4" />
                        <span>Bollinger Bands</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 hover:bg-slate-50 cursor-pointer">
                        <input type="checkbox" checked={showMovingAverage} onChange={(e) => setShowMovingAverage(e.target.checked)} className="w-4 h-4" />
                        <span>Moving Average</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 hover:bg-slate-50 cursor-pointer">
                        <input type="checkbox" checked={showTrend} onChange={(e) => setShowTrend(e.target.checked)} className="w-4 h-4" />
                        <span>Trend Line</span>
                    </label>
                </div>
            )}
        </div>
    );
};

export default function PriceChart({
    data,
    selectedTimeframe,
    setSelectedTimeframe,
    timeframes,
    showBollingerBands,
    setShowBollingerBands,
    showMovingAverage,
    setShowMovingAverage,
    showTrend,
    setShowTrend
}) {
    const [crosshair, setCrosshair] = useState(null);

    const yDomain = useMemo(() => {
        if (!data || data.length === 0) {
            return ['auto', 'auto'];
        }

        const lows = data.map(p => p.low);
        const highs = data.map(p => p.high);

        if (lows.length === 0 || highs.length === 0) {
            return ['auto', 'auto'];
        }

        const min = Math.min(...lows);
        const max = Math.max(...highs);
        const padding = (max - min) * 0.15;

        return [min - padding, max + padding];
    }, [data]);

    const handleMouseMove = (e) => {
        if (e.activePayload && e.activePayload.length) {
            const payload = e.activePayload[0].payload;
            setCrosshair({
                time: payload.bucket, // Changed from time
                price: payload.close,
            });
        }
    };

    const handleMouseLeave = () => {
        setCrosshair(null);
    };

    const formatTime = (timeStr) => {
        const date = new Date(timeStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Price Chart</h3>
                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 rounded-md p-1">
                        {Object.keys(timeframes).map((tf) => (
                            <button
                                key={tf}
                                onClick={() => setSelectedTimeframe(tf)}
                                className={`py-1 px-3 rounded text-sm transition-all ${selectedTimeframe === tf ? 'bg-white shadow-sm' : ''}`}
                            >
                                {tf}
                            </button>
                        ))}
                    </div>
                    <IndicatorDropdown
                        showBollingerBands={showBollingerBands}
                        setShowBollingerBands={setShowBollingerBands}
                        showMovingAverage={showMovingAverage}
                        setShowMovingAverage={setShowMovingAverage}
                        showTrend={showTrend}
                        setShowTrend={setShowTrend}
                    />
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                    data={data}
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
                    <XAxis dataKey="bucket" tickFormatter={formatTime} tick={{ fill: '#374151', fontSize: 12 }} stroke="#d1d5db" />
                    <YAxis
                        orientation="right"
                        yAxisId="right"
                        domain={yDomain}
                        tickFormatter={(value) => typeof value === 'number' ? `$${value.toFixed(2)}` : ''}
                        tick={{ fill: '#374151', fontSize: 12 }}
                        stroke="#d1d5db"
                    />
                    <Tooltip
                        cursor={false}
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                const dataPoint = payload[0].payload;
                                if (!dataPoint || typeof dataPoint.open !== 'number' || typeof dataPoint.high !== 'number' || typeof dataPoint.low !== 'number' || typeof dataPoint.close !== 'number') {
                                    return null;
                                }
                                const { open, high, low, close } = dataPoint;
                                return (
                                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 p-2 rounded-md shadow-lg text-xs">
                                        <p className="font-semibold text-gray-800 mb-1">{formatTime(label)}</p>
                                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                                            <p className="text-gray-600"><span className="font-medium text-gray-500">O:</span> {open.toFixed(2)}</p>
                                            <p className="text-gray-600"><span className="font-medium text-gray-500">H:</span> {high.toFixed(2)}</p>
                                            <p className="text-gray-600"><span className="font-medium text-gray-500">L:</span> {low.toFixed(2)}</p>
                                            <p className="text-gray-600"><span className="font-medium text-gray-500">C:</span> {close.toFixed(2)}</p>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Area type="monotone" dataKey="close" stroke="#3b82f6" fill="url(#colorClose)" strokeWidth={2} yAxisId="right" />

                    {showBollingerBands && (
                        <>
                            <Line type="monotone" dataKey="upperBB" stroke="#9ca3af" strokeDasharray="3 3" dot={false} yAxisId="right" />
                            <Line type="monotone" dataKey="lowerBB" stroke="#9ca3af" strokeDasharray="3 3" dot={false} yAxisId="right" />
                        </>
                    )}

                    {showMovingAverage && (
                        <Line type="monotone" dataKey="ma20" stroke="#f59e0b" strokeWidth={2} dot={false} yAxisId="right" />
                    )}

                    {showTrend && (
                        <ReferenceLine
                            yAxisId="right"
                            stroke="#dc2626"
                            strokeDasharray="4 4"
                            segment={[
                                { x: data[0]?.bucket, y: data[0]?.close }, // Changed from time
                                { x: data[data.length - 1]?.bucket, y: data[data.length - 1]?.close }, // Changed from time
                            ]}
                        />
                    )}

                    {crosshair && (
                        <>
                            <ReferenceLine x={crosshair.time} stroke="#6b7280" strokeDasharray="3 3" />
                            <ReferenceLine y={crosshair.price} yAxisId="right" stroke="#6b7280" strokeDasharray="3 3" />
                        </>
                    )}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
