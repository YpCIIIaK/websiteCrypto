export default function VolumeMeter({ data }) {
  const avgVolume = data.reduce((sum, entry) => sum + entry.volume, 0) / data.length
  const avgVolumeM = avgVolume / 1000000
  const volumeLevel = avgVolumeM > 80 ? "High" : avgVolumeM > 50 ? "Medium" : "Low"

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg mb-4">Volume Meter</h3>
      <div className="text-center">
        <div className="relative w-24 h-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-t-full bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500"></div>
          <div 
            className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-black rounded-sm origin-bottom transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-50%) rotate(${Math.min((avgVolumeM / 100) * 90 - 90, 90)}deg)`
            }}
          ></div>
        </div>
        <div className="text-2xl font-bold mb-2">{avgVolumeM.toFixed(1)}M</div>
        <div className="inline-block py-1 px-3 bg-slate-100 rounded-full text-sm mb-2">{volumeLevel} Volume</div>
        <p className="text-xs text-slate-500">Average daily volume</p>
      </div>
    </div>
  )
}
