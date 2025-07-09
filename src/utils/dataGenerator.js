export function generateAnalyticsData(symbol = "BTC") {
  const sma = Math.random() * 100000 + 100000;
  const ema = sma * (1 + (Math.random() - 0.5) * 0.01);
  const vwap = sma * (1 + (Math.random() - 0.5) * 0.01);
  const min_price = sma * (1 - Math.random() * 0.05);
  const max_price = sma * (1 + Math.random() * 0.05);
  return {
    symbol: symbol,
    timeframe: "1D",
    period_minutes: 18,
    sma: sma,
    ema: ema,
    pct_change_24h: (Math.random() - 0.5) * 0.1,
    vwap: vwap,
    total_volume: Math.random() * 2,
    exchange_count: Math.floor(Math.random() * 10) + 1,
    min_price: min_price,
    max_price: max_price,
    price_stddev: null,
    price_spread_pct: ((max_price - min_price) / max_price) * 100,
    volatility_percentage: Math.random() * 0.05,
    trend_direction: Math.random() > 0.5 ? "bullish" : "bearish",
    trend_strength: Math.random(),
    market_noise: Math.random() * 0.02,
    trend_slope: (Math.random() - 0.5) * 2,
    market_cap: Math.random() * 2e12 + 1e12,
    circulating_supply: Math.random() * 2e7 + 1e7,
    market_rank: Math.floor(Math.random() * 100) + 1,
    volume_24h: Math.random() * 20000,
    median_daily_volume: null,
  };
}

export function generateChartData(
  symbol = "BTC",
  timeframe = "7D",
  bucket_size = "10m",
  points = 200
) {
  const data = [];
  let lastClose = Math.random() * 10000 + 65000; // Start with a realistic price < 100k
  const baseVolume = 100;
  const maPeriod = 20;

  // Calculate the time increment based on bucket_size
  let incrementMinutes;
  if (bucket_size.endsWith("m")) {
    incrementMinutes = parseInt(bucket_size.slice(0, -1), 10);
  } else if (bucket_size.endsWith("h")) {
    incrementMinutes = parseInt(bucket_size.slice(0, -1), 10) * 60;
  } else if (bucket_size.endsWith("d")) {
    incrementMinutes = parseInt(bucket_size.slice(0, -1), 10) * 60 * 24;
  } else {
    incrementMinutes = 10; // default to 10m
  }

  const now = new Date();

  for (let i = 0; i < points; i++) {
    const bucket_date = new Date(now.getTime() - (points - i) * incrementMinutes * 60 * 1000);
    const open = lastClose;
    const volatility = (Math.random() - 0.495) * 0.01; // Reduced volatility
    const close = open * (1 + volatility);
    const high = Math.max(open, close) * (1 + Math.random() * 0.005);
    const low = Math.min(open, close) * (1 - Math.random() * 0.005);
    const volume = baseVolume * (0.5 + Math.random());
    const vwap = (open + high + low + close) / 4;

    const newDataPoint = {
      bucket: bucket_date.toISOString(),
      open: open,
      high: high,
      low: low,
      close: close,
      volume: volume,
      vwap: vwap,
      total_volume: volume * (i + 1), // a cumulative volume
      exchange_count: Math.floor(Math.random() * 5) + 1,
      price_stddev: Math.random() * 10,
      upper_band: null,
      lower_band: null,
      rolling_mean: null,
      band_width_pct: null,
      position_in_band: null,
      trend_line: null,
      trend_direction: null,
      detrended: null,
      residual: null,
      // For chart compatibility
      ma20: null,
      upperBB: null,
      lowerBB: null,
    };
    
    data.push(newDataPoint);

    // Calculate MA and BB using a variable window for the start of the series
    const windowStart = Math.max(0, i - maPeriod + 1);
    const slice = data.slice(windowStart, i + 1);
    
    const sum = slice.reduce((acc, val) => acc + val.close, 0);
    const ma = sum / slice.length;
    data[i].ma20 = ma;

    const stdDev = Math.sqrt(
      slice.map(d => Math.pow(d.close - ma, 2)).reduce((a, b) => a + b, 0) / slice.length
    );
    data[i].upperBB = ma + (stdDev * 2);
    data[i].lowerBB = ma - (stdDev * 2);
    
    lastClose = close;
  }

  return {
    symbol: symbol,
    timeframe: timeframe,
    bucket_size: bucket_size,
    total_points: points,
    included_layers: ["base", "vwap", "bands"],
    query_time_ms: Math.random() * 100,
    data_source: "on_demand",
    data: data,
    trend_summary: null,
  };
} 