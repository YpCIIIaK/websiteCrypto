import React from 'react';
import { Card, CardBody } from "@heroui/react";

const MinMaxChart = ({ low, current, average, high }) => {
    const totalRange = high - low;
    const currentPosition = ((current - low) / totalRange) * 100;
    const averagePosition = ((average - low) / totalRange) * 100;

    return (
        <Card className="bg-content1/40 backdrop-blur-md border border-white/10">
            <CardBody>
                <div className="relative h-32">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-1 bg-gray-700 rounded-full">
                            <div
                                className="h-full bg-crypto-accent rounded-full"
                                style={{ width: `${currentPosition}%` }}
                            />
                        </div>
                    </div>
                    
                    {/* Текущая цена */}
                    <div
                        className="absolute top-0 transform -translate-x-1/2"
                        style={{ left: `${currentPosition}%` }}
                    >
                        <div className="w-2 h-2 bg-crypto-accent rounded-full" />
                        <div className="mt-1 text-xs text-white">${current.toLocaleString()}</div>
                    </div>

                    {/* Средняя цена */}
                    <div
                        className="absolute top-0 transform -translate-x-1/2"
                        style={{ left: `${averagePosition}%` }}
                    >
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        <div className="mt-1 text-xs text-gray-400">Avg</div>
                    </div>

                    {/* Минимальная цена */}
                    <div className="absolute bottom-0 left-0">
                        <div className="text-xs text-gray-400">${low.toLocaleString()}</div>
                    </div>

                    {/* Максимальная цена */}
                    <div className="absolute bottom-0 right-0">
                        <div className="text-xs text-gray-400">${high.toLocaleString()}</div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default MinMaxChart;
