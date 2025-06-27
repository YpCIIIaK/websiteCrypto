import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/buttons/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/cards/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/tabs/Tabs";
import { Input } from "../../components/forms/Input";
import {
    Star,
    TrendingUp,
    TrendingDown,
    ExternalLink,
    Copy,
    ChevronRight,
    Share2,
    Flag,
    MoreHorizontal,
    Search,
    Settings,
} from "lucide-react";
import { formatNumber, formatPrice, formatPercent } from "../../utils/formatters";
import { mockCryptoData } from "../../utils/mockData"; // Используем существующие мок-данные
import MainChart from "../../components/graph/MainChart.jsx";
import MinMaxChart from "../../components/graph/MinMaxChart.jsx";
import VolatilityChart from "../../components/graph/VolatilityChart.jsx";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "../../components/dropdown/Dropdown";

// Адаптированная функция для генерации данных в формате OHLC
const generatePriceDataForTimeframe = (basePrice, timeframe) => {
    const now = new Date();
    const configs = {
        "1H": { points: 60, volatility: 0.005, unit: 'minutes', step: 1 },
        "24H": { points: 144, volatility: 0.01, unit: 'minutes', step: 10 },
        "7D": { points: 168, volatility: 0.02, unit: 'hours', step: 1 },
        "30D": { points: 30, volatility: 0.05, unit: 'days', step: 1 },
        "90D": { points: 90, volatility: 0.08, unit: 'days', step: 1 },
        "1Y": { points: 365, volatility: 0.1, unit: 'days', step: 1 },
        ALL: { points: 100, volatility: 0.15, unit: 'weeks', step: 1 },
    };

    const config = configs[timeframe] || configs["7D"];
    const data = [];
    let lastClose = basePrice;

    for (let i = config.points - 1; i >= 0; i--) {
        const date = new Date(now);
        if (config.unit === 'minutes') {
            date.setMinutes(now.getMinutes() - i * config.step);
        } else if (config.unit === 'hours') {
            date.setHours(now.getHours() - i * config.step);
        } else if (config.unit === 'days') {
            date.setDate(now.getDate() - i * config.step);
        } else if (config.unit === 'weeks') {
            date.setDate(now.getDate() - i * config.step * 7);
        }

        const open = lastClose;
        const change = (Math.random() - 0.49) * 2 * config.volatility;
        const close = open * (1 + change);
        const high = Math.max(open, close) * (1 + Math.random() * config.volatility * 0.5);
        const low = Math.min(open, close) * (1 - Math.random() * config.volatility * 0.5);
        
        data.push({
            time: date.toISOString(),
            open,
            high,
            low,
            close,
        });

        lastClose = close;
    }
    return data;
};

const CoinDetail = () => {
    const [crypto, setCrypto] = useState(null);
    const [timeframe, setTimeframe] = useState("7D");
    const [isFavorite, setIsFavorite] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showTrend, setShowTrend] = useState(true);
    
    const navigate = useNavigate();
    const { symbol } = useParams();

    useEffect(() => {
        // Найдем данные по символу в нашем мок-файле
        const data = mockCryptoData.find(c => c.symbol.toLowerCase() === symbol.toLowerCase());
        
        // Дополним данными, если их нет
        const fullData = {
            ...data,
            marketCapRank: data?.rank || 1,
            description: "A placeholder description for the cryptocurrency, its technology, use cases, and recent developments. This would be replaced with actual data in a real application.",
            website: "https://example.com",
            whitepaper: "https://example.com/whitepaper.pdf",
            github: "https://github.com/example",
            reddit: "https://reddit.com/r/example",
            twitter: "https://twitter.com/example",
            allTimeHigh: (data?.price || 0) * 1.5,
            allTimeHighDate: "Jan 01, 2024",
            allTimeLow: (data?.price || 0) / 10,
            allTimeLowDate: "Jan 01, 2022",
            circulatingSupply: data?.marketCap / data?.price || 10000000,
            totalSupply: data?.marketCap / data?.price || 10000000,
            maxSupply: 21000000,
            fullyDilutedValuation: (data?.price || 0) * 21000000,
            change30d: (Math.random() - 0.5) * 30,
        };

        setCrypto(fullData);
    }, [symbol]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".search-container")) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const priceData = useMemo(() => {
        if (crypto) {
            return generatePriceDataForTimeframe(crypto.price, timeframe);
        }
        return [];
    }, [crypto, timeframe]);

    const trendData = useMemo(() => {
        if (!priceData || priceData.length === 0) return [];

        const exponentialMovingAverage = (data, windowSize) => {
            if (!data || data.length === 0) return [];
            
            const multiplier = 2 / (windowSize + 1);
            let emaArray = [];

            // Первый EMA - это просто первая цена закрытия
            emaArray.push({
                time: data[0].time,
                avg_price: data[0].close
            });

            // Расчет последующих EMA
            for (let i = 1; i < data.length; i++) {
                const ema = (data[i].close * multiplier) + (emaArray[i - 1].avg_price * (1 - multiplier));
                emaArray.push({
                    time: data[i].time,
                    avg_price: ema
                });
            }
            
            return emaArray;
        };

        return exponentialMovingAverage(priceData, 10); // Используем EMA с периодом 10
    }, [priceData]);

    const handleCryptoClick = (searchCrypto) => {
        navigate(`/coin/${searchCrypto.symbol.toLowerCase()}`);
    };

    const filteredSearchData = mockCryptoData
        .filter(
            (searchCrypto) =>
                searchCrypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                searchCrypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);

    if (!crypto) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-50">
            {/* Breadcrumb */}
            <div className="bg-gradient-to-r from-white to-emerald-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/tokens")}>
                            Tokens
                        </span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">{crypto.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Search Bar */}
                <div className="flex items-center justify-end mb-6">
                    <div className="relative search-container">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                        <Input
                            placeholder="Search coins..."
                            className="pl-12 w-96 h-12 bg-white/90 backdrop-blur-sm border-2 border-emerald-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                        />
                        {showSuggestions && searchTerm && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-80 overflow-y-auto z-50">
                                {filteredSearchData.map((searchCrypto) => (
                                    <div
                                        key={searchCrypto.symbol}
                                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                        onClick={() => {
                                            handleCryptoClick(searchCrypto);
                                            setSearchTerm("");
                                            setShowSuggestions(false);
                                        }}
                                    >
                                        <img
                                            src={searchCrypto.icon || "/placeholder.svg"}
                                            alt={searchCrypto.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-semibold text-gray-900">{searchCrypto.name}</div>
                                                    <div className="text-sm text-gray-500 uppercase">{searchCrypto.symbol}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-semibold text-gray-900">{formatPrice(searchCrypto.price)}</div>
                                                    <div className={`text-sm ${searchCrypto.change24h >= 0 ? "text-teal-600" : "text-red-600"}`}>
                                                        {formatPercent(searchCrypto.change24h)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {filteredSearchData.length === 0 && (
                                    <div className="p-3 text-gray-500 text-center">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Coin Header */}
                <Card className="p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <img src={crypto.icon || "/placeholder.svg"} alt={crypto.name} className="w-12 h-12 rounded-full" />
                            <div>
                                <div className="flex items-center space-x-3">
                                    <h1 className="text-2xl font-bold text-gray-900">{crypto.name}</h1>
                                    <span className="text-lg text-gray-500 uppercase">{crypto.symbol}</span>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                                        Rank #{crypto.marketCapRank}
                                    </span>
                                    <Button variant="ghost" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
                                        <Star className={`h-5 w-5 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                            </Button>
                            <Button variant="outline" size="sm">
                                <Flag className="h-4 w-4 mr-1" />
                                Report
                            </Button>
                            <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3">
                            <span className="text-3xl font-bold text-gray-900">{formatPrice(crypto.price)}</span>
                            <div
                                className={`flex items-center space-x-1 ${crypto.change24h >= 0 ? "text-teal-600" : "text-red-600"}`}
                            >
                                {crypto.change24h >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                                <span className="text-lg font-semibold">{formatPercent(crypto.change24h)}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                            <div className={`${crypto.change1h >= 0 ? "text-teal-600" : "text-red-600"}`}>
                                <span className="text-gray-600">1h: </span>
                                <span className="font-semibold">{formatPercent(crypto.change1h)}</span>
                            </div>
                            <div className={`${crypto.change7d >= 0 ? "text-teal-600" : "text-red-600"}`}>
                                <span className="text-gray-600">7d: </span>
                                <span className="font-semibold">{formatPercent(crypto.change7d)}</span>
                            </div>
                            <div className={`${crypto.change30d >= 0 ? "text-teal-600" : "text-red-600"}`}>
                                <span className="text-gray-600">30d: </span>
                                <span className="font-semibold">{formatPercent(crypto.change30d)}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Main Chart */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle>{crypto.name} to USD Chart</CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-1">
                                            {["1H", "24H", "7D", "30D", "90D", "1Y", "ALL"].map((period) => (
                                                <Button
                                                    key={period}
                                                    variant={timeframe === period ? "default" : "ghost"}
                                                    size="sm"
                                                    className={
                                                        timeframe === period
                                                            ? "bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white h-8 px-3"
                                                            : "text-gray-600 hover:text-teal-600 h-8 px-3"
                                                    }
                                                    onClick={() => setTimeframe(period)}
                                                >
                                                    {period}
                                                </Button>
                                            ))}
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="p-2 h-8">
                                                    <Settings className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Chart Settings</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuCheckboxItem
                                                    checked={showTrend}
                                                    onCheckedChange={setShowTrend}
                                                >
                                                    Show Trend Line
                                                </DropdownMenuCheckboxItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <MainChart 
                                    ohlcData={priceData} 
                                    showTrend={showTrend} 
                                    trendData={trendData} 
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stats Sidebar */}
                    <div>
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle>{crypto.symbol} Price Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">{crypto.name} Price</span>
                                    <span className="font-semibold">{formatPrice(crypto.price)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Market Cap</span>
                                    <span className="font-semibold">{formatNumber(crypto.marketCap)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Trading Volume</span>
                                    <span className="font-semibold">{formatNumber(crypto.volume24h)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Market Cap Rank</span>
                                    <span className="font-semibold">#{crypto.marketCapRank}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Circulating Supply</span>
                                    <span className="font-semibold">{crypto.circulatingSupply?.toLocaleString()} {crypto.symbol}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-8">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-5 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg p-1">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="markets">Markets</TabsTrigger>
                            <TabsTrigger value="historical">Historical Data</TabsTrigger>
                            <TabsTrigger value="news">News</TabsTrigger>
                            <TabsTrigger value="about">About</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">Overview content will be displayed here...</p>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                                        <Card>
                                            <CardHeader><CardTitle>Price Performance</CardTitle></CardHeader>
                                            <CardContent>
                                                <div className="flex justify-between items-center py-2 border-b"><span>All-Time High</span> <span className="font-semibold">{formatPrice(crypto.allTimeHigh)}</span></div>
                                                <div className="flex justify-between items-center py-2"><span>All-Time Low</span> <span className="font-semibold">{formatPrice(crypto.allTimeLow)}</span></div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader><CardTitle>Links</CardTitle></CardHeader>
                                            <CardContent className="grid grid-cols-2 gap-2">
                                                <Button variant="outline" size="sm" onClick={() => window.open(crypto.website, "_blank")}><ExternalLink className="h-4 w-4 mr-2" />Website</Button>
                                                <Button variant="outline" size="sm" onClick={() => window.open(crypto.whitepaper, "_blank")}><ExternalLink className="h-4 w-4 mr-2" />Whitepaper</Button>
                                                <Button variant="outline" size="sm" onClick={() => window.open(crypto.github, "_blank")}><ExternalLink className="h-4 w-4 mr-2" />GitHub</Button>
                                                <Button variant="outline" size="sm" onClick={() => window.open(crypto.twitter, "_blank")}><ExternalLink className="h-4 w-4 mr-2" />Twitter</Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                                        <MinMaxChart
                                            low={crypto.allTimeLow}
                                            high={crypto.allTimeHigh}
                                            current={crypto.price}
                                        />
                                        <VolatilityChart />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="markets" className="mt-6">
                            <Card>
                                <CardHeader><CardTitle>Markets</CardTitle></CardHeader>
                                <CardContent><p className="text-gray-600">Market data will be displayed here...</p></CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="historical" className="mt-6">
                            <Card>
                                <CardHeader><CardTitle>Historical Data</CardTitle></CardHeader>
                                <CardContent><p className="text-gray-600">Historical price data will be displayed here...</p></CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="news" className="mt-6">
                            <Card>
                                <CardHeader><CardTitle>Latest News</CardTitle></CardHeader>
                                <CardContent><p className="text-gray-600">News articles will be displayed here...</p></CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="about" className="mt-6">
                             <Card>
                                <CardHeader><CardTitle>About {crypto.name}</CardTitle></CardHeader>
                                <CardContent><p className="text-gray-700 leading-relaxed">{crypto.description}</p></CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default CoinDetail; 