import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip
} from "recharts";
import { Card, CardBody, Button, Tooltip } from "@heroui/react";
import HighLowSlider from "./HighLowSlider";

export const MiniCharts = ({
  highLowData,
  sentimentData,
  volumeHeatmapData
}) => {
  const [highLowView, setHighLowView] = React.useState("daily");
  
  const currentHighLowData = highLowData[highLowView];
  
  const formatYAxis = (value) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else {
      return value.toFixed(1);
    }
  };
  
  const formatHighLowDate = (dateStr) => {
    const date = new Date(dateStr);
    if (highLowView === "daily") {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  const HighLowTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = highLowView === "daily" 
        ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
      
      return (
        <div style={{ backgroundColor: 'var(--surface-alt)', padding: '8px', borderRadius: '6px', border: '1px solid var(--brand)' }}>
          <p className="font-medium text-base text-sm leading-5">{formattedDate}</p>
          <p className="text-info text-sm leading-5">Price: ${payload[0].value.toFixed(2)}</p>
          <p className="text-muted text-xs leading-4">
            High: ${currentHighLowData.high.toFixed(2)} | Low: ${currentHighLowData.low.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const SentimentTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'var(--surface-alt)', padding: '8px', borderRadius: '6px', border: '1px solid var(--brand)' }}>
          <p className="font-medium text-base text-sm leading-5">{label}</p>
          <p className="text-success text-sm leading-5">Buy: {payload[0].value}%</p>
          <p className="text-muted text-sm leading-5">Neutral: {payload[1].value}%</p>
          <p className="text-danger text-sm leading-5">Sell: {payload[2].value}%</p>
        </div>
      );
    }
    return null;
  };
  
  const formatVolume = (volume) => {
    if (volume >= 1000000000) {
      return `$${(volume / 1000000000).toFixed(2)}B`;
    } else if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(2)}M`;
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(2)}K`;
    } else {
      return `$${volume.toFixed(2)}`;
    }
  };
  
  const minVolume = Math.min(...volumeHeatmapData.map(d => d.volume));
  const maxVolume = Math.max(...volumeHeatmapData.map(d => d.volume));
  
  const getColorIntensity = (volume) => {
    const normalized = (volume - minVolume) / (maxVolume - minVolume);
    return Math.max(0.1, normalized);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* High/Low Chart */}
      <HighLowSlider
        min={currentHighLowData.low}
        max={currentHighLowData.high}
        current={currentHighLowData.current}
        average={currentHighLowData.average}
      />
      
      {/* Sentiment Chart */}
      <Card className="bg-surface-alt rounded-xl border border-brand">
        <CardBody>
          <h3 className="text-base font-semibold text-base leading-6 mb-4">Market Sentiment</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sentimentData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                stackOffset="expand"
                barCategoryGap={1}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-alt)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: 'var(--text-muted)' }}
                  tickLine={{ stroke: 'var(--text-muted)' }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                  }}
                />
                <YAxis 
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  tick={{ fill: 'var(--text-muted)' }}
                  tickLine={{ stroke: 'var(--text-muted)' }}
                />
                <RechartsTooltip content={<SentimentTooltip />} />
                <Bar dataKey="buy" stackId="a" fill="var(--success)" />
                <Bar dataKey="neutral" stackId="a" fill="var(--text-muted)" />
                <Bar dataKey="sell" stackId="a" fill="var(--danger)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-xs leading-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-success mr-1"></div>
              <span className="text-base">Buy</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-muted mr-1"></div>
              <span className="text-base">Neutral</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-danger mr-1"></div>
              <span className="text-base">Sell</span>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Volume Heatmap */}
      <Card className="bg-surface-alt rounded-xl border border-brand">
        <CardBody>
          <h3 className="text-base font-semibold text-base leading-6 mb-4">Trading Volume Heatmap</h3>
          <div className="h-[200px] flex flex-col">
            <div className="flex-1 grid grid-cols-6 gap-1">
              {volumeHeatmapData.map((day, index) => {
                const colorIntensity = getColorIntensity(day.volume);
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
                const monthDay = date.getDate();
                
                return (
                  <Tooltip 
                    key={index}
                    content={
                      <div className="px-2 py-1" style={{ backgroundColor: 'var(--surface-alt)', borderRadius: '6px', border: '1px solid var(--brand)' }}>
                        <p className="font-medium text-base text-sm leading-5">
                          {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-base text-sm leading-5">Volume: {formatVolume(day.volume)}</p>
                      </div>
                    }
                    placement="top"
                  >
                    <div
                      className="w-full h-8 rounded flex flex-col items-center justify-center"
                      style={{ backgroundColor: `rgba(34, 94, 154, ${colorIntensity})` }}
                    >
                      <span className="text-[10px] text-base font-medium leading-none drop-shadow-sm">{dayName}</span>
                      <span className="text-[11px] text-base font-bold leading-none drop-shadow-sm">{monthDay}</span>
                    </div>
                  </Tooltip>
                );
              })}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-muted leading-4">Lower Volume</div>
              <div className="flex-1 mx-2 h-2 rounded-full" style={{ 
                background: 'linear-gradient(to right, rgba(34, 94, 154, 0.1), rgba(34, 94, 154, 1))' 
              }}></div>
              <div className="text-xs text-muted leading-4">Higher Volume</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default MiniCharts;