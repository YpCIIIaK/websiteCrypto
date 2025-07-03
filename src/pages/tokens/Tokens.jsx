import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCryptoData } from '../../hooks/use-crypto-data'
import { useSearch } from '../../hooks/use-search'
import { useFavorites } from '../../hooks/use-favorites'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from '../../components/dropdown/Dropdown';
import { SlidersHorizontal } from 'lucide-react';

import MarketStatsBar from '../../components/crypto/Layout/MarketStatsBar'
import SearchBar from '../../components/crypto/SearchBar/SearchBar'
import CategoryFilters from '../../components/crypto/Filters/CategoryFilters'
import AdvancedFilters from '../../components/crypto/Filters/AdvancedFilters'
import CoinTable from '../../components/crypto/CoinTable/CoinTable'

const Tokens = () => {
    const navigate = useNavigate()
    const { cryptoData, loading } = useCryptoData()
    const { favorites, toggleFavorite } = useFavorites()
    const {
        searchTerm,
        setSearchTerm,
        showSuggestions,
        setShowSuggestions,
        filteredData: searchFilteredData // Renamed to avoid conflict
    } = useSearch(cryptoData)

    const [activeCategory, setActiveCategory] = useState('All')
    const [advancedFilters, setAdvancedFilters] = useState({
        marketCap: { min: '', max: '' },
        price: { min: '', max: '' },
    });
    
    const [isAdvancedFilterApplied, setIsAdvancedFilterApplied] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredData = useMemo(() => {
        let data = searchFilteredData;

        // Category Filter
        if (activeCategory !== 'All') {
            data = data.filter(coin => coin.category === activeCategory);
        }

        // Advanced Filters
        if (isAdvancedFilterApplied) {
            data = data.filter(coin => {
                const { marketCap, price } = advancedFilters;
                const mc = coin.marketCap;
                const p = coin.price;

                const minMcMatch = !marketCap.min || mc >= parseFloat(marketCap.min);
                const maxMcMatch = !marketCap.max || mc <= parseFloat(marketCap.max);
                const minPriceMatch = !price.min || p >= parseFloat(price.min);
                const maxPriceMatch = !price.max || p <= parseFloat(price.max);

                return minMcMatch && maxMcMatch && minPriceMatch && maxPriceMatch;
            });
        }

        return data;
    }, [searchFilteredData, activeCategory, advancedFilters, isAdvancedFilterApplied]);


    const handleCoinClick = (crypto) => {
        navigate(`/coin/${crypto.symbol.toLowerCase()}`)
    }

    const handleSuggestionClick = (crypto) => {
        setSearchTerm('')
        handleCoinClick(crypto)
    }

    const applyAdvancedFilters = () => {
        setIsAdvancedFilterApplied(true);
        setIsDropdownOpen(false); // Close dropdown on apply
    };

    // Закрытие suggestions при клике вне области
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-container')) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [setShowSuggestions])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-50">
            <MarketStatsBar />
      
            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Logo and Search */}
                <div className="flex items-center justify-end mb-6">
                    <div className="search-container">
                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showSuggestions={showSuggestions}
                            setShowSuggestions={setShowSuggestions}
                            suggestions={filteredData}
                            onSuggestionClick={handleSuggestionClick}
                        />
                    </div>
                </div>

                {/* Title Section */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200 shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Cryptocurrency Prices by Market Cap
                    </h1>
                    <p className="text-gray-600">
                        The global cryptocurrency market cap today is $1,674,234,567,890, a{" "}
                        <span className="text-green-600 font-semibold">2.3%</span> change in the last 24 hours.{" "}
                        <a href="#" className="text-blue-600 hover:underline">Read More</a>
                    </p>
                </div>

                {/* Filters */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <CategoryFilters 
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    </div>
                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                                <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                                <span>Advanced Filters</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-96">
                            <AdvancedFilters 
                                filters={advancedFilters}
                                setFilters={setAdvancedFilters}
                                applyFilters={applyAdvancedFilters}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Table */}
                <CoinTable
                    data={filteredData}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onCoinClick={handleCoinClick}
                />

                {/* Load More */}
                <div className="text-center mt-8">
                    <button className="px-8 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                        Load More Cryptocurrencies
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Tokens 