import { Activity } from 'lucide-react'

export default function VolumeHeatmap({ data }) {
  const maxVolume = Math.max(...data.map((d) => d.volume))

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold"><Activity size={20} /> Volume Heatmap</h3>
      </div>
      
      <div className="flex flex-wrap gap-0.5 p-4 max-w-full">
        {data.slice(-75).map((entry, index) => {
          const priceChangePercent = index > 0
            ? ((entry.price - data[data.indexOf(entry) - 1]?.price) / data[data.indexOf(entry) - 1]?.price) * 100
            : 0

          const volumeIntensity = entry.volume / maxVolume
          const isPositive = priceChangePercent >= 0
          const opacity = Math.max(volumeIntensity, 0.1)

          const backgroundColor = isPositive
            ? `rgba(34, 197, 94, ${opacity})`
            : `rgba(239, 68, 68, ${opacity})`

          return (
            <div
              key={index}
              className="group relative w-3 h-3 rounded-sm cursor-pointer transition-all hover:scale-150 hover:z-10"
              style={{ backgroundColor }}
              title={`Date: ${new Date(entry.date).toLocaleDateString()}
Volume: ${(entry.volume / 1000000).toFixed(1)}M
Price: $${entry.price.toFixed(2)}
Change: ${priceChangePercent >= 0 ? '+' : ''}${priceChangePercent.toFixed(2)}%`}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-black text-white text-xs rounded-md opacity-0 transition-opacity whitespace-nowrap z-20 pointer-events-none group-hover:opacity-100">
                <div>{new Date(entry.date).toLocaleDateString()}</div>
                <div>Vol: {(entry.volume / 1000000).toFixed(1)}M</div>
                <div>
                  ${entry.price.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}
                  {priceChangePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-green-500"></div>
            <span>Price Up</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-500"></div>
            <span>Price Down</span>
          </div>
        </div>
        <div className="text-xs">Intensity = Volume Only</div>
      </div>
    </div>
  )
}
