import { Activity } from 'lucide-react'

// The maximum number of cells we want to display.
// If data points exceed this, we will aggregate them.
const MAX_CELLS = 100;

const aggregateData = (data, targetSize) => {
  // If the data is already smaller than the target, just remap it to the expected format
  if (data.length <= targetSize) {
    return data.map(d => ({
      bucket: d.bucket,
      close: d.close,
      volume: d.volume,
    }));
  }

  const aggregated = [];
  const chunkSize = data.length / targetSize;

  for (let i = 0; i < targetSize; i++) {
    const chunkStart = Math.floor(i * chunkSize);
    const chunkEnd = Math.floor((i + 1) * chunkSize);
    const chunk = data.slice(chunkStart, chunkEnd);

    if (chunk.length === 0) continue;

    const totalVolume = chunk.reduce((sum, d) => sum + d.volume, 0);
    const startPrice = chunk[0].close; // Changed from price
    const endPrice = chunk[chunk.length - 1].close; // Changed from price
    const date = chunk[chunk.length - 1].bucket; // Changed from date
    
    // The price for the aggregated cell will be the end price of the chunk
    const price = endPrice;

    aggregated.push({
      bucket: date, // Changed from date
      close: price, // Changed from price
      volume: totalVolume,
      // We will calculate price change based on the previous aggregated cell
    });
  }
  return aggregated;
};


export default function VolumeHeatmap({ data }) {
  if (!data || data.length === 0) {
    return <div>Loading heatmap...</div>;
  }

  const processedData = aggregateData(data, MAX_CELLS);
  const maxVolume = Math.max(...processedData.map((d) => d.volume).filter(v => isFinite(v)), 1);

  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold"><Activity size={20} /> Volume Heatmap</h3>
      </div>
      
      <div 
        className="grid gap-px"
        style={{ gridTemplateColumns: `repeat(${processedData.length}, minmax(0, 1fr))` }}
      >
        {processedData.map((entry, index) => {
          const priceChangePercent = index > 0
            ? ((entry.close - processedData[index - 1].close) / processedData[index - 1].close) * 100
            : 0

          const volumeIntensity = entry.volume / maxVolume
          const isPositive = priceChangePercent >= 0
          const opacity = Math.max(volumeIntensity, 0.15)

          const backgroundColor = isPositive
            ? `rgba(34, 197, 94, ${opacity})`
            : `rgba(239, 68, 68, ${opacity})`

          return (
            <div
              key={index}
              className="group relative h-6 rounded-sm cursor-pointer transition-all hover:z-10"
              style={{ backgroundColor }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-black text-white text-xs rounded-md opacity-0 transition-opacity whitespace-nowrap z-20 pointer-events-none group-hover:opacity-100">
                <div>{new Date(entry.bucket).toLocaleDateString()}</div>
                <div>Vol: ${(entry.volume / 1000000).toFixed(1)}M</div>
                <div>
                  ${entry.close.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}
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
