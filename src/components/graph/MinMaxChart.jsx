import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../cards/Card";

const MinMaxChart = ({ low, current, high }) => {
    const totalRange = high - low;
    const currentPosition = totalRange > 0 ? ((current - low) / totalRange) * 100 : 50;
    
    const clampedCurrentPos = Math.max(0, Math.min(100, currentPosition));

    return (
        <Card>
            <CardHeader className="items-center">
                <CardTitle>24h Range</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-2">
                <div className="relative h-24 flex items-center">
                    {/* Background line */}
                    <div className="w-full h-1.5 bg-gray-200 rounded-full" />
                    
                    {/* Current price marker */}
                    <div
                        className="absolute"
                        style={{ left: `${clampedCurrentPos}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                        <div className="relative flex flex-col items-center">
                             <div className="absolute -top-9 text-lg font-bold text-gray-900 whitespace-nowrap bg-white/50 backdrop-blur-sm px-1 rounded">
                                ${current.toLocaleString()}
                            </div>
                            <div className="w-4 h-4 bg-blue-600 rounded-full ring-2 ring-white z-10 shadow-md" />
                        </div>
                    </div>

                    {/* Min price */}
                    <div className="absolute -bottom-2 left-0 text-center">
                        <div className="text-base text-gray-800 font-semibold">${low.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Low</div>
                    </div>

                    {/* Max price */}
                    <div className="absolute -bottom-2 right-0 text-center">
                        <div className="text-base text-gray-800 font-semibold">${high.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">High</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MinMaxChart;
