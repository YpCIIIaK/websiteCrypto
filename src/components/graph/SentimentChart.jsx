import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../cards/Card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const SentimentChart = () => {
    // Моковые данные
    const sentiment = {
        bullish: 65,
        neutral: 25,
        bearish: 10
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Bullish */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-600">Bullish</span>
                                <span className="text-sm font-medium text-green-600">{sentiment.bullish}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${sentiment.bullish}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Neutral */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Minus className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-600">Neutral</span>
                                <span className="text-sm font-medium text-gray-600">{sentiment.neutral}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-gray-500 rounded-full"
                                    style={{ width: `${sentiment.neutral}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bearish */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <TrendingDown className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-600">Bearish</span>
                                <span className="text-sm font-medium text-red-600">{sentiment.bearish}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-red-500 rounded-full"
                                    style={{ width: `${sentiment.bearish}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SentimentChart;
