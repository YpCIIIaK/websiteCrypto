const generateSparkline = (currentPrice, change7d, points = 40) => {
    const data = [];
    let price = currentPrice;
    
    // Рассчитываем начальную цену, от которой будем идти
    const startPrice = price / (1 + change7d / 100);
    
    // Рассчитываем шаг изменения для каждой точки
    const step = (price - startPrice) / points;

    for (let i = 0; i < points; i++) {
        // Добавляем немного случайности для "живости" графика
        const volatility = (Math.random() - 0.5) * (startPrice * 0.50); // 10% волатильность от начальной цены
        const pointPrice = startPrice + (step * i) + volatility;
        data.push(pointPrice);
    }
    // Убедимся, что последняя точка - это текущая цена
    data[points - 1] = currentPrice;

    return data;
};

export const mockCryptoData = [
  {
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25651/svg/color/btc.svg',
    price: 67182.34,
    change1h: 0.5,
    change24h: 2.1,
    change7d: -3.4,
    volume24h: 35123456789,
    marketCap: 1323456789012,
    sparkline: generateSparkline(67182.34, -3.4),
    category: 'Layer 1',
  },
  {
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25651/svg/color/eth.svg',
    price: 3512.91,
    change1h: -0.2,
    change24h: 1.5,
    change7d: -5.1,
    volume24h: 18123456789,
    marketCap: 421456789012,
    sparkline: generateSparkline(3512.91, -5.1),
    category: 'Layer 1',
  },
  {
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25651/svg/color/usdt.svg',
    price: 1.00,
    change1h: 0.0,
    change24h: 0.0,
    change7d: 0.0,
    volume24h: 50123456789,
    marketCap: 110456789012,
    sparkline: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
    category: 'Stablecoin',
  },
    {
    rank: 4,
    name: 'Solana',
    symbol: 'SOL',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25651/svg/color/sol.svg',
    price: 150.75,
    change1h: 1.2,
    change24h: 5.8,
    change7d: -10.2,
    volume24h: 2123456789,
    marketCap: 69456789012,
    sparkline: generateSparkline(150.75, -10.2),
    category: 'Layer 1',
  },
  {
    rank: 5,
    name: 'Uniswap',
    symbol: 'UNI',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25651/svg/color/uni.svg',
    price: 10.50,
    change1h: 0.8,
    change24h: 4.2,
    change7d: -8.5,
    volume24h: 345678901,
    marketCap: 7890123456,
    sparkline: generateSparkline(10.50, -8.5),
    category: 'DeFi',
  },
  {
    rank: 6,
    name: 'Aave',
    symbol: 'AAVE',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25651/svg/color/aave.svg',
    price: 95.20,
    change1h: -0.5,
    change24h: 1.9,
    change7d: -12.1,
    volume24h: 123456789,
    marketCap: 1456789012,
    sparkline: generateSparkline(95.20, -12.1),
    category: 'DeFi',
  },
  {
    rank: 7,
    name: 'Axie Infinity',
    symbol: 'AXS',
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25651/svg/color/axs.svg',
    price: 7.50,
    change1h: 2.5,
    change24h: 10.1,
    change7d: -20.5,
    volume24h: 234567890,
    marketCap: 987654321,
    sparkline: generateSparkline(7.50, -20.5),
    category: 'NFT',
  },
]; 