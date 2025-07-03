import { DollarSign, Activity, Users, Coins, Calendar } from 'lucide-react'

export default function StockInfo({ stockData }) {
  const iconMap = {
    "Market Cap": DollarSign,
    "Avg Volume": Activity,
    "Shares Outstanding": Coins,
    "P/E Ratio": Users,
    "52W High": Calendar
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg mb-4 font-semibold">Stock Info</h3>
      {Object.entries(stockData).map(([label, value]) => {
        const Icon = iconMap[label] || DollarSign;
        return (
          <div key={label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Icon size={16} />
              <span>{label}</span>
            </div>
            <div className="text-sm font-medium">{value}</div>
          </div>
        )
      })}
    </div>
  )
} 