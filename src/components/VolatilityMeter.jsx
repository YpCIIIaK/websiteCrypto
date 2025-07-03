export default function VolatilityMeter({ volatility }) {
  const volatilityLevel = volatility > 5 ? "High" : volatility > 2 ? "Medium" : "Low"

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg mb-4">Volatility Meter</h3>
      <div className="text-center">
        <div className="relative w-24 h-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-t-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"></div>
          <div 
            className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-black rounded-sm origin-bottom transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-50%) rotate(${Math.min(volatility * 18 - 90, 90)}deg)`
            }}
          ></div>
        </div>
        <div className="text-2xl font-bold mb-2">{volatility.toFixed(1)}%</div>
        <div className="inline-block py-1 px-3 bg-slate-100 rounded-full text-sm mb-2">{volatilityLevel} Volatility</div>
        <p className="text-xs text-slate-500">Daily move percentage</p>
      </div>
    </div>
  )
} 