import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { TrendingUp, TrendingDown, Bell } from 'lucide-react'
import PriceChart from './PriceChart'
import VolumeHeatmap from './VolumeHeatmap'
import TrendCard from './TrendCard'
import VolatilityMeter from './VolatilityMeter'
import VolumeMeter from './VolumeMeter'
import StockInfo from './StockInfo'
import { generateChartData } from '../utils/dataGenerator'
import { cryptoData } from '../data/cryptoData'

const timeframes = {
  "1D": 1,
  "7D": 7,
  "30D": 30,
  "90D": 90,
  "1Y": 365,
}

export default function CoinDetailPage() {
  const { coinId } = useParams()
  
  if (!coinId) {
    // Render a loading state or nothing while coinId is not available
    return <div className="text-center p-8">Loading...</div>;
  }

  let coin = cryptoData.find(c => c.id && c.id.toLowerCase() === coinId.toLowerCase())

  if (!coin) {
    coin = {
      id: coinId,
      name: coinId.charAt(0).toUpperCase() + coinId.slice(1),
      symbol: coinId.toUpperCase(),
      price: Math.random() * 1000,
      marketCap: Math.random() * 1e12,
      volume24h: Math.random() * 1e10,
      icon: "/placeholder.svg?height=24&width=24",
    }
  }

  const [selectedTimeframe, setSelectedTimeframe] = useState("30D")
  const [alertPrice, setAlertPrice] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [showBollingerBands, setShowBollingerBands] = useState(true)
  const [showMovingAverage, setShowMovingAverage] = useState(true)
  const [showTrend, setShowTrend] = useState(false)

  const chartData = generateChartData(coin.symbol, selectedTimeframe)
  const data = chartData.data
  const currentPrice = data[data.length - 1]?.close || 0
  const previousPrice = data[data.length - 2]?.close || 0
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = previousPrice ? ((priceChange / previousPrice) * 100).toFixed(2) : 0

  const trendSlope = data.length > 10 ? (data[data.length - 1].close - data[data.length - 10].close) / 10 : 0
  const trendPower = currentPrice ? Math.min(Math.abs((trendSlope / currentPrice) * 100) * 10, 100) : 0
  const volatility = Math.abs(parseFloat(priceChangePercent))
  
  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto bg-slate-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
              <img src={coin.icon} alt={coin.name} className="w-12 h-12" />
            </div>
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-4xl font-bold mb-1">{coin.name}</h1>
                <span className="text-slate-500 text-base">{coin.symbol.toUpperCase()}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{currentPrice.toFixed(2)}</span>
                <span className="text-xl text-slate-500">USD</span>
                <div className={`flex items-center gap-1 text-lg ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {priceChange >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  <span>{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}</span>
                  <span>({priceChange >= 0 ? '+' : ''}{priceChangePercent}%)</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            className="flex items-center gap-2 py-2 px-4 border border-slate-300 rounded-md bg-white cursor-pointer text-sm hover:bg-slate-100 transition-all"
            onClick={() => setShowAlert(true)}
          >
            <Bell size={16} />
            Set Alert
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
        <div className="flex flex-col gap-6">
          <PriceChart 
            data={data}
            selectedTimeframe={selectedTimeframe}
            setSelectedTimeframe={setSelectedTimeframe}
            timeframes={timeframes}
            showBollingerBands={showBollingerBands}
            setShowBollingerBands={setShowBollingerBands}
            showMovingAverage={showMovingAverage}
            setShowMovingAverage={setShowMovingAverage}
            showTrend={showTrend}
            setShowTrend={setShowTrend}
          />
          <VolumeHeatmap data={data} />
        </div>

        <div className="flex flex-col gap-6">
          <TrendCard trendSlope={trendSlope} />
          <TrendCard trendPower={trendPower} isPower={true} />
          <VolatilityMeter volatility={volatility} />
          <VolumeMeter data={data} />
          <StockInfo stockData={{
            "Market Cap": `$${(coin.marketCap / 1e9).toFixed(2)}B`,
            "Avg Volume": `$${(coin.volume24h / 1e6).toFixed(2)}M`,
            "Shares Outstanding": "N/A",
            "P/E Ratio": "N/A",
            "52W High": "N/A"
          }} />
        </div>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAlert(false)}>
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl mb-2">Price Alert for {coin.name}</h3>
            <p className="text-slate-500 mb-4">You'll be notified when the price reaches your target.</p>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Target Price ($)</label>
              <input
                type="number"
                placeholder="Enter target price"
                value={alertPrice}
                onChange={(e) => setAlertPrice(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md text-sm"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowAlert(false)} className="py-2 px-4 border border-slate-300 rounded-md bg-white cursor-pointer text-sm">Cancel</button>
              <button className="py-2 px-4 border border-blue-600 rounded-md bg-blue-600 text-white cursor-pointer text-sm">Set Alert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 