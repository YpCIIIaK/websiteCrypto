import { TrendingUp, TrendingDown } from 'lucide-react'

export default function TrendCard({ trendSlope, trendPower, isPower = false }) {
  if (isPower) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm text-center">
        <h4 className="text-sm text-slate-500 mb-4">Trend Power</h4>
        <div className="text-4xl font-bold mb-2">{trendPower.toFixed(0)}%</div>
        <div className="inline-block py-1 px-3 bg-slate-100 rounded-full text-sm">
          {trendPower > 70 ? "Strong" : trendPower > 30 ? "Moderate" : "Weak"}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm text-center">
      <h4 className="text-sm text-slate-500 mb-4">Direction</h4>
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 ${trendSlope >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {trendSlope >= 0 ? <TrendingUp size={32} /> : <TrendingDown size={32} />}
      </div>
      <div className="text-2xl font-bold font-mono mb-1">{trendSlope.toFixed(1)}</div>
      <div className="text-xs text-slate-500">Slope Value</div>
    </div>
  )
} 