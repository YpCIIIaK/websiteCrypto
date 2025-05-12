import React from 'react';

const MinMaxChart = ({ low, current, average, high }) => {
    const scale = (value) => {
        const min = low;
        const max = high;
        return ((value - min) / (max - min)) * 100;
    };

    return (
        <div className="w-full h-[200px] px-4 py-2 bg-[#1e1e2f] rounded-md text-white flex flex-col items-center justify-center">
            {/* Контейнер шкалы */}
            <div className="relative w-full max-w-[90%] h-[100px] flex items-center justify-center">
                {/* Линия */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600 rounded-full -translate-y-1/2" />

                {/* LOW */}
                <div className="absolute left-0 -translate-x-1/2 top-0 text-center">
                    <div className="text-sm">{low.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">Low</div>
                </div>

                {/* HIGH */}
                <div className="absolute right-0 translate-x-1/2 top-0 text-center">
                    <div className="text-sm">{high.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">High</div>
                </div>

                {/* AVERAGE */}
                <div
                    className="absolute flex flex-col items-center"
                    style={{
                        left: `${scale(average)}%`,
                        top: '45%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div className="mb-1 text-sm bg-blue-600 px-2 py-1 rounded">{average.toFixed(2)}</div>
                    <div className="w-3 h-3 rounded-full bg-blue-500 border border-gray-800" />
                    <div className="text-xs text-gray-300 mt-1">Average</div>
                </div>

                {/* CURRENT */}
                <div
                    className="absolute flex flex-col items-center"
                    style={{
                        left: `${scale(current)}%`,
                        top: '57%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div className="text-xs text-gray-400 mb-1">Current</div>
                    <div className="w-3 h-3 rounded-full bg-white border border-gray-800" />
                    <div className="mt-1 text-sm bg-gray-800 px-2 py-1 rounded">{current.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
};

export default MinMaxChart;
