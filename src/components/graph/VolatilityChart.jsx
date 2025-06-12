import React from 'react';
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

const VolatilityChart = ({ data, timeframe }) => {
    const volatility = {
        high: 75,
        medium: 20,
        low: 5
    };

    return (
        <Card className="bg-content1/40 backdrop-blur-md border border-white/10">
            <CardBody>
                <div className="space-y-4">
                    {/* High Volatility */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <Icon icon="lucide:zap" className="w-5 h-5" style={{ color: '#22C55E' }} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-400">High</span>
                                <span className="text-sm text-red-500">{volatility.high}%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                                <div
                                    className="h-full bg-red-500 rounded-full"
                                    style={{ width: `${volatility.high}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Medium Volatility */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <Icon icon="lucide:activity" className="w-5 h-5" style={{ color: '#22C55E' }} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-400">Medium</span>
                                <span className="text-sm text-yellow-500">{volatility.medium}%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                                <div
                                    className="h-full bg-yellow-500 rounded-full"
                                    style={{ width: `${volatility.medium}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Low Volatility */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Icon icon="lucide:line-chart" className="w-5 h-5" style={{ color: '#22C55E' }} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-400">Low</span>
                                <span className="text-sm text-green-500">{volatility.low}%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${volatility.low}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default VolatilityChart;