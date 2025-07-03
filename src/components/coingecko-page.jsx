import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Search, Star } from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { cryptoData } from "../data/cryptoData"

const SparklineChart = ({ data, color }) => (
  <ResponsiveContainer width="100%" height={50}>
    <LineChart data={data.map((price) => ({ price }))}>
      <Line type="monotone" dataKey="price" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
)

// Функция для генерации случайных данных графика
const generateRandomPriceData = (basePrice, points, volatility = 0.05) => {
  const data = []
  let currentPrice = basePrice

  for (let i = 0; i < points; i++) {
    // Случайное изменение цены в пределах volatility
    const change = (Math.random() - 0.5) * 2 * volatility
    currentPrice = currentPrice * (1 + change)
    data.push(currentPrice)
  }

  return data
}

// Функция для генерации sparkline данных (30 дней вместо 7)
const generateSparklineData = (basePrice) => {
  return generateRandomPriceData(basePrice, 30, 0.03)
}

const formatNumber = (num) => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
  return `$${num.toFixed(2)}`
}

const formatPrice = (price) => {
  if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return `$${price.toFixed(4)}`
}

const formatPercent = (percent) => {
  const formatted = Math.abs(percent).toFixed(2)
  return percent >= 0 ? `+${formatted}%` : `-${formatted}%`
}

function CoinGeckoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate()
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Move the sparkline generation inside the component
  const cryptoDataWithSparklines = useMemo(() => {
    return cryptoData.map((crypto) => ({
      ...crypto,
      sparkline: generateSparklineData(crypto.price),
    }))
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCryptoClick = (crypto) => {
    navigate(`/coin/${crypto.symbol.toLowerCase()}`)
  }

  const handleStarClick = (crypto, e) => {
    e.stopPropagation()
    setFavorites((prev) =>
      prev.includes(crypto.symbol) ? prev.filter((symbol) => symbol !== crypto.symbol) : [...prev, crypto.symbol],
    )
  }

  const filteredData = cryptoDataWithSparklines
    .filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => a.rank - b.rank)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-50">
      {/* Market Stats Banner */}
      <div className="bg-gradient-to-r from-white to-emerald-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Cryptos:</span>
                <span className="font-semibold">2.4M+</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Exchanges:</span>
                <span className="font-semibold">760</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Market Cap:</span>
                <span className="font-semibold">$1,674,234,567,890</span>
                <span className="text-green-600 font-semibold">+2.3%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">24h Vol:</span>
                <span className="font-semibold">$89,234,567,890</span>
                <span className="text-red-600 font-semibold">-5.1%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Dominance:</span>
                <span className="font-semibold">BTC: 50.7%</span>
                <span className="font-semibold">ETH: 18.6%</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">🔥 Trending:</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Solana</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Cardano</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Polygon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Logo and Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🦎</span>
            </div>
            <span className="text-3xl font-bold text-gray-900 cursor-pointer" onClick={() => navigate("/")}>
              CoinGecko
            </span>
          </div>

          <div className="relative search-container">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search coins, exchanges, NFT collections..."
              className="pl-12 w-96 h-12 bg-white/90 backdrop-blur-sm border-2 border-emerald-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
            />

            {/* Suggestions dropdown */}
            {showSuggestions && searchTerm && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-80 overflow-y-auto z-50">
                {filteredData.slice(0, 5).map((crypto) => (
                  <div
                    key={crypto.symbol}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      handleCryptoClick(crypto)
                      setSearchTerm("")
                      setShowSuggestions(false)
                    }}
                  >
                    <img src={crypto.icon || "/placeholder.svg"} alt={crypto.name} className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{crypto.name}</div>
                          <div className="text-sm text-gray-500 uppercase">{crypto.symbol}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{formatPrice(crypto.price)}</div>
                          <div className={`text-sm ${crypto.change24h >= 0 ? "text-teal-600" : "text-red-600"}`}>
                            {formatPercent(crypto.change24h)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredData.length === 0 && <div className="p-3 text-gray-500 text-center">No results found</div>}
              </div>
            )}
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cryptocurrency Prices by Market Cap</h1>
          <p className="text-gray-600">
            The global cryptocurrency market cap today is $1,674,234,567,890, a{" "}
            <span className="text-green-600 font-semibold">2.3%</span> change in the last 24 hours.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Read More
            </a>
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-600 mr-2">Highlights</span>
          {["🔥 Trending", "🚀 Gainers", "📉 Losers", "⭐ Recently Added", "💎 Categories"].map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className="text-xs border-gray-300 hover:border-green-500 hover:text-green-600"
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          {[
            "All",
            "DeFi",
            "NFT",
            "Metaverse",
            "Gaming",
            "AI",
            "Meme",
            "Layer 1",
            "Layer 2",
            "Infrastructure",
            "Smart Contract Platform",
          ].map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              size="sm"
              className={
                activeFilter === category
                  ? "bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white"
                  : "border-gray-300 hover:border-teal-500 hover:text-teal-600"
              }
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Table */}
        <Card className="rounded-lg text-card-foreground shadow-sm bg-white/90 backdrop-blur-sm border border-white/20">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b-0">
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">1h %</TableHead>
                  <TableHead className="text-right">24h %</TableHead>
                  <TableHead className="text-right">7d %</TableHead>
                  <TableHead className="text-right">24h Volume</TableHead>
                  <TableHead className="text-right">Market Cap</TableHead>
                  <TableHead className="w-48 text-center">Last 7 Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((crypto) => (
                  <TableRow
                    key={crypto.symbol}
                    className="cursor-pointer border-b border-gray-200/50 hover:bg-gray-200/20"
                    onClick={() => handleCryptoClick(crypto)}
                  >
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Star
                          className={`h-5 w-5 transition-colors ${
                            favorites.includes(crypto.symbol)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                          onClick={(e) => handleStarClick(crypto, e)}
                        />
                        <span className="ml-3">{crypto.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img src={crypto.icon} alt={crypto.name} className="h-6 w-6" width={24} height={24} />
                        <div>
                          <div className="font-semibold">{crypto.name}</div>
                          <div className="text-sm text-gray-500">{crypto.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatPrice(crypto.price)}</TableCell>
                    <TableCell
                      className={`text-right font-semibold ${
                        crypto.change1h >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatPercent(crypto.change1h)}
                    </TableCell>
                    <TableCell
                      className={`text-right font-semibold ${
                        crypto.change24h >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatPercent(crypto.change24h)}
                    </TableCell>
                    <TableCell
                      className={`text-right font-semibold ${
                        crypto.change7d >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatPercent(crypto.change7d)}
                    </TableCell>
                    <TableCell className="text-right">{formatNumber(crypto.volume24h)}</TableCell>
                    <TableCell className="text-right">{formatNumber(crypto.marketCap)}</TableCell>
                    <TableCell>
                      <SparklineChart
                        data={crypto.sparkline}
                        color={crypto.change7d >= 0 ? "#16a34a" : "#dc2626"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8">
            Load More Cryptocurrencies
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CoinGeckoPage 