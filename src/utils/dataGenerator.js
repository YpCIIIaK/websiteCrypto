export function generatePriceData(days, basePrice = 315.65) {
  const data = []
  let lastClose = basePrice
  const volume = 50000000

  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000)
    const open = lastClose
    const volatility = Math.random() * 0.04 - 0.02 // ±2% daily volatility
    const close = open * (1 + volatility)
    const high = Math.max(open, close) * (1 + Math.random() * 0.01)
    const low = Math.min(open, close) * (1 - Math.random() * 0.01)
    const dailyVolume = volume * (0.5 + Math.random())

    data.push({
      time: date.toISOString().split("T")[0],
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      price: Math.round(close * 100) / 100, // For compatibility with other components
      volume: Math.round(dailyVolume),
      ma20: Math.round(close * (0.98 + Math.random() * 0.04) * 100) / 100,
      upperBB: Math.round(close * 1.02 * 100) / 100,
      lowerBB: Math.round(close * 0.98 * 100) / 100,
      unusualVolume: dailyVolume > volume * 2,
    })
    lastClose = close
  }
  return data
} 