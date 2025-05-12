import React, { useState } from 'react';
import MainChart from '../../components/graph/MainChart.jsx';
import responseData from './response.json'; // Import response.json
import Card from '../../components/cards/Card.jsx';
import MinMaxChart from '../../components/graph/MinMaxChart.jsx';
import SentimentChart from '../../components/graph/SentimentChart.jsx';
import VolatilityChart from '../../components/graph/VolatilityChart.jsx';
import SummaryCard from '../../components/cards/SummaryCard.jsx';

// Функция для форматирования чисел до 4 знаков после запятой
const formatNumber = (num) => Number(num.toFixed(4));

// Функция для обработки данных из response.json
const processChartData = () => {
    const rawData = responseData;

    // Проверка данных
    if (!rawData || rawData.length === 0) {
        console.error('response.json is empty or invalid');
        return {
            '1m': [],
            '1h': [],
            '1d': [],
            trend: { '1m': [], '1h': [], '1d': [] },
            staticData: []
        };
    }

    // Фильтрация валидных данных
    const validRawData = rawData.filter(item => {
        const isValid = item.ts && !isNaN(new Date(item.ts)) && typeof item.price === 'number' && typeof item.volume === 'number';
        if (!isValid) console.warn('Invalid data point:', item);
        return isValid;
    });

    // Сортируем данные по временной метке
    const sortedRawData = validRawData.sort((a, b) => new Date(a.ts) - new Date(b.ts));

    // Агрегация для минутных данных
    const minuteData = [];
    const minuteBuckets = {};
    sortedRawData.forEach(item => {
        const date = new Date(item.ts);
        if (isNaN(date)) return; // Пропускаем невалидные даты
        date.setSeconds(0, 0); // Округляем до минуты
        const bucketKey = date.toISOString();
        if (!minuteBuckets[bucketKey]) {
            minuteBuckets[bucketKey] = [];
        }
        minuteBuckets[bucketKey].push(item);
    });

    for (const bucketKey in minuteBuckets) {
        const chunk = minuteBuckets[bucketKey];
        if (chunk.length > 0) {
            const open = formatNumber(chunk[0].price);
            const close = formatNumber(chunk[chunk.length - 1].price);
            const high = formatNumber(Math.max(...chunk.map(d => d.price)));
            const low = formatNumber(Math.min(...chunk.map(d => d.price)));
            const volume = formatNumber(chunk.reduce((sum, d) => sum + d.volume, 0));
            minuteData.push({
                time: bucketKey,
                open,
                high,
                low,
                close,
                volume
            });
        }
    }
    const sortedMinuteData = minuteData.sort((a, b) => new Date(a.time) - new Date(b.time));

    // Логирование для отладки
    console.log('Processed minuteData:', sortedMinuteData);

    // Определяем временные диапазоны
    const now = new Date();
    const oneMinuteRange = new Date(now.getTime() - 120 * 60 * 1000); // Последние 60 минут
    const oneHourRange = new Date(now.getTime() - 10 * 60 * 60 * 1000); // Последние 12 часов
    const oneDayRange = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000); // Последние 60 дней

    // Данные для 1m (последние 60 минут или все данные, если пусто)
    let oneMinuteData = sortedMinuteData
        .filter(item => new Date(item.time) >= oneMinuteRange)
        .slice(-60);
    if (oneMinuteData.length === 0) {
        console.warn('No data for 1m timeframe, using all available data');
        oneMinuteData = sortedMinuteData.slice(-120);
    }

    // Данные для 1h (все минуты за последние 12 часов или все данные, если пусто)
    let oneHourData = sortedMinuteData
        .filter(item => new Date(item.time) >= oneHourRange);
    if (oneHourData.length === 0) {
        console.warn('No data for 1h timeframe, using all available data');
        oneHourData = sortedMinuteData.slice(-720); // Максимум 720 точек (12 часов)
    }

    // Данные для 1d (каждая 10-я минута за последние 60 дней)
    const oneDayData = [];
    const filteredDayData = sortedMinuteData.filter(item => new Date(item.time) >= oneDayRange);
    filteredDayData.forEach((item, index) => {
        if (index % 10 === 0) { // Берем каждую 10-ю минуту
            oneDayData.push(item);
        }
    });
    const finalOneDayData = oneDayData.length < 10 ? filteredDayData : oneDayData;

    // Статические данные для MinMaxChart и SentimentChart
    const staticData = sortedMinuteData.length > 0 ? [{
        time: sortedMinuteData[sortedMinuteData.length - 1].time,
        open: formatNumber(sortedMinuteData[0].open),
        close: formatNumber(sortedMinuteData[sortedMinuteData.length - 1].close),
        high: formatNumber(Math.max(...sortedMinuteData.map(d => d.high))),
        low: formatNumber(Math.min(...sortedMinuteData.map(d => d.low))),
        volume: formatNumber(sortedMinuteData.reduce((sum, d) => sum + d.volume, 0)),
        average: formatNumber(sortedMinuteData.reduce((sum, d) => sum + d.close, 0) / sortedMinuteData.length)
    }] : [];

    // Данные тренда
    const trendData1m = oneMinuteData.map(item => ({
        time: item.time,
        avg_price: formatNumber((item.open + item.close) / 2)
    }));
    const trendData1h = oneHourData.map(item => ({
        time: item.time,
        avg_price: formatNumber((item.open + item.close) / 2)
    }));
    const trendData1d = finalOneDayData.map(item => ({
        time: item.time,
        avg_price: formatNumber((item.open + item.close) / 2)
    }));

    // Логирование итоговых данных
    console.log('1m data:', oneMinuteData);
    console.log('1h data:', oneHourData);
    console.log('1d data:', finalOneDayData);
    console.log('staticData:', staticData);

    return {
        '1m': oneMinuteData,
        '1h': oneHourData,
        '1d': finalOneDayData,
        trend: {
            '1m': trendData1m,
            '1h': trendData1h,
            '1d': trendData1d
        },
        staticData
    };
};

const Tickers = () => {
    const [timeframe, setTimeframe] = useState('1m');
    const [chartType, setChartType] = useState('line');
    const [showTrend, setShowTrend] = useState(false);

    const timeframes = ['1m', '1h', '1d'];
    const chartTypes = ['line'];

    const chartData = processChartData();

    const data = chartData[timeframe] || [];
    const trendData = chartData.trend[timeframe] || [];
    const staticData = chartData.staticData || [];

    const lastPrice = data.length > 0 ? formatNumber(data[data.length - 1].close) : 'N/A';
    const percentageChange = data.length > 1
        ? formatNumber(((data[data.length - 1].close - data[data.length - 2].close) / data[data.length - 2].close) * 100)
        : null;

    const chartOptions = {
        line: {
            tension: 0
        }
    };

    return (
        <div className="container mx-auto px-13 py-8">
            <div className="mt-4">
                <div className="flex items-end gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Ticker</h1>
                    <span className="text-xl font-semibold text-gray-800 dark:text-white">
                        ${lastPrice}
                    </span>
                    {percentageChange !== null && (
                        <span
                            className={`text-xl font-medium ${
                                percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                            {percentageChange >= 0 ? '+' : ''}{percentageChange}%
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-row">
                <div className="m-3 ml-0 flex gap-4">
                    <button
                        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                            showTrend
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setShowTrend(!showTrend)}
                    >
                        Trend: {showTrend ? 'On' : 'Off'}
                    </button>
                </div>
            </div>

            <div className="mt-1 w-full">
                <div className="w-full h-[470px] bg-white rounded-lg">
                    <MainChart
                        data={data}
                        chartType={chartType}
                        options={chartOptions}
                        showTrend={showTrend}
                        trendData={trendData}
                        timeframe={timeframe}
                    />
                </div>
            </div>

            <div className="flex flex-row justify-between w-full">
                <div className="flex gap-4 m-3 ml-0">
                    {timeframes.map((tf) => (
                        <button
                            key={tf}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                timeframe === tf
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            onClick={() => setTimeframe(tf)}
                        >
                            {tf === '1m' ? '1 Minute' : tf === '1h' ? '1 Hour' : '1 Day'}
                        </button>
                    ))}
                </div>

                <div className="flex gap-4 m-3 mr-0">
                    {chartTypes.map((type) => (
                        <button
                            key={type}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                chartType === type
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            onClick={() => setChartType(type)}
                        >
                            Line
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <SummaryCard data={chartData} timeframe={timeframe} />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="Min/Max Prices">
                    <MinMaxChart
                        low={staticData.length > 0 ? staticData[0].low : 0}
                        current={staticData.length > 0 ? staticData[0].close : 0}
                        average={staticData.length > 0 ? staticData[0].average : 0}
                        high={staticData.length > 0 ? staticData[0].high : 0}
                    />
                </Card>
                <Card title="Market Sentiment">
                    <SentimentChart data={staticData} timeframe={timeframe} />
                </Card>
                <Card title="Volatility">
                    <VolatilityChart data={chartData} timeframe={timeframe} />
                </Card>
            </div>
        </div>
    );
};

export default Tickers;