import React, { useState } from 'react';

const Backtest = () => {

    return (
        <div className="min-h-screen bg-surface text-base flex items-center justify-center">
            <div className="bg-surface-alt rounded-2xl shadow-lg p-10 max-w-xl w-full">
                <h1 className="text-3xl font-bold text-brand mb-4">Backtest</h1>
                <p className="text-muted mb-2">Тестируйте свои стратегии на исторических данных и оптимизируйте прибыль с помощью аналитики.</p>
            </div>
        </div>
    );
};

export default Backtest;