import React from 'react';
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

const SentimentChart = ({ data, timeframe }) => {
    const sentiment = {
        bullish: 65,
        neutral: 25,
        bearish: 10
    };

    return (
        <Card className="bg-content1/40 backdrop-blur-md border border-white/10">
            <CardBody>
                <div className="space-y-4">
                    {/* Bullish */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Icon icon="lucide:trending-up" className="w-5 h-5" style={{ color: '#22C55E' }} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-400">Bullish</span>
                                <span className="text-sm text-green-500">{sentiment.bullish}%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${sentiment.bullish}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Neutral */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">
                            <Icon icon="lucide:minus" className="w-5 h-5" style={{ color: '#22C55E' }} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-400">Neutral</span>
                                <span className="text-sm text-gray-500">{sentiment.neutral}%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                                <div
                                    className="h-full bg-gray-500 rounded-full"
                                    style={{ width: `${sentiment.neutral}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bearish */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <Icon icon="lucide:trending-down" className="w-5 h-5" style={{ color: '#22C55E' }} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-400">Bearish</span>
                                <span className="text-sm text-red-500">{sentiment.bearish}%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                                <div
                                    className="h-full bg-red-500 rounded-full"
                                    style={{ width: `${sentiment.bearish}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default SentimentChart;
