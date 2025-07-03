import React, { useMemo } from 'react';

const AdvancedFilterInput = ({ label, placeholder, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

const AdvancedFilters = ({ filters, setFilters, applyFilters }) => {

    const handleReset = () => {
        setFilters({
            marketCap: { min: '', max: '' },
            price: { min: '', max: '' },
        });
        // We might want to trigger applyFilters here as well, or have the parent do it.
        // For now, let's assume the user will click "Apply" after resetting.
    };

    return (
        <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <AdvancedFilterInput
                    label="Market Cap Min"
                    placeholder="e.g., 1000000"
                    value={filters.marketCap.min}
                    onChange={val => setFilters(f => ({ ...f, marketCap: { ...f.marketCap, min: val } }))}
                />
                <AdvancedFilterInput
                    label="Market Cap Max"
                    placeholder="e.g., 1000000000"
                    value={filters.marketCap.max}
                    onChange={val => setFilters(f => ({ ...f, marketCap: { ...f.marketCap, max: val } }))}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <AdvancedFilterInput
                    label="Price Min"
                    placeholder="e.g., 1"
                    value={filters.price.min}
                    onChange={val => setFilters(f => ({ ...f, price: { ...f.price, min: val } }))}
                />
                <AdvancedFilterInput
                    label="Price Max"
                    placeholder="e.g., 1000"
                    value={filters.price.max}
                    onChange={val => setFilters(f => ({ ...f, price: { ...f.price, max: val } }))}
                />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
                <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Reset
                </button>
                <button
                    onClick={applyFilters}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default AdvancedFilters; 