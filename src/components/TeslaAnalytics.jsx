import { useState } from 'react'
import { TrendingUp, TrendingDown, Bell } from 'lucide-react'
import PriceChart from './PriceChart'
import VolumeHeatmap from './VolumeHeatmap'
import TrendCard from './TrendCard'
import VolatilityMeter from './VolatilityMeter'
import VolumeMeter from './VolumeMeter'
import StockInfo from './StockInfo'
import { generatePriceData } from '../utils/dataGenerator'
import '../styles/components.css'

const timeframes = {
  "1D": 1,
  "7D": 7,
  "30D": 30,
  "90D": 90,
  "1Y": 365,
}

const navigationTabs = [
  "Overview", "Financials", "News", "Ideas", "Discussions",
  "Technicals", "Forecast", "Seasonals", "Options", "Bonds"
]

export default function TeslaAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30D")
  const [showBollingerBands, setShowBollingerBands] = useState(false)
  const [showTrend, setShowTrend] = useState(true)
  const [showMovingAverage, setShowMovingAverage] = useState(true)
  const [alertPrice, setAlertPrice] = useState("")
  const [activeTab, setActiveTab] = useState("Overview")
  const [showAlert, setShowAlert] = useState(false)

  const data = generatePriceData(timeframes[selectedTimeframe])
  const currentPrice = data[data.length - 1]?.price || 315.65
  const previousPrice = data[data.length - 2]?.price || 300.71
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2)

  const trendSlope = data.length > 10 ? (data[data.length - 1].price - data[data.length - 10].price) / 10 : 0
  const trendPower = Math.min(Math.abs((trendSlope / currentPrice) * 100) * 10, 100)
  const volatility = Math.abs(parseFloat(priceChangePercent))

  return (
    <div className="tesla-analytics">
      {/* Header */}
      <div className="header-section">
        <div className="price-info">
          <div className="company-info">
            <div className="tesla-logo">
              <span>T</span>
            </div>
            <div className="company-details">
              <div className="company-name">
                <h1>Tesla</h1>
                <span className="ticker">TSLA</span>
              </div>
              <div className="price-display">
                <span className="current-price">{currentPrice.toFixed(2)}</span>
                <span className="currency">USD</span>
                <div className={`price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
                  {priceChange >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  <span>{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}</span>
                  <span>{priceChange >= 0 ? '+' : ''}{priceChangePercent}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            className="alert-button"
            onClick={() => setShowAlert(true)}
          >
            <Bell size={16} />
            Set Alert
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="navigation-tabs">
          {navigationTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="charts-section">
          <PriceChart 
            data={data}
            selectedTimeframe={selectedTimeframe}
            setSelectedTimeframe={setSelectedTimeframe}
            showBollingerBands={showBollingerBands}
            setShowBollingerBands={setShowBollingerBands}
            showTrend={showTrend}
            setShowTrend={setShowTrend}
            showMovingAverage={showMovingAverage}
            setShowMovingAverage={setShowMovingAverage}
            timeframes={timeframes}
          />
          <VolumeHeatmap data={data} />
        </div>

        <div className="sidebar">
          <TrendCard trendSlope={trendSlope} />
          <TrendCard trendPower={trendPower} isPower={true} />
          <VolatilityMeter volatility={volatility} />
          <VolumeMeter data={data} />
          <StockInfo />
        </div>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <div className="modal-overlay" onClick={() => setShowAlert(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Price Alert</h3>
            <p>Set a price alert for Tesla. You'll be notified when the price reaches your target.</p>
            <div className="input-group">
              <label>Target Price ($)</label>
              <input
                type="number"
                placeholder="Enter target price"
                value={alertPrice}
                onChange={(e) => setAlertPrice(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowAlert(false)}>Cancel</button>
              <button className="primary">Set Alert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 