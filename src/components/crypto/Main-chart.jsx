import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea
} from "recharts";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const MainChart = ({ data }) => {
  const [timeRange, setTimeRange] = React.useState("1M");
  
  const [zoomState, setZoomState] = React.useState({
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    isZooming: false
  });
  
  const filteredData = React.useMemo(() => {
    if (!data.length) return [];
    
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case "1D":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        break;
      case "1W":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case "1M":
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "3M":
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "1Y":
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case "ALL":
      default:
        return data;
    }
    
    const startDateStr = startDate.toISOString();
    return data.filter(item => item.date >= startDateStr);
  }, [data, timeRange]);
  
  const formatYAxis = (value) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${value.toFixed(1)}`;
    }
  };
  
  const formatTooltipValue = (value) => {
    if (value >= 1000) {
      return value.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 2
      });
    } else if (value >= 1) {
      return value.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      return value.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      });
    }
  };
  
  const priceChange = React.useMemo(() => {
    if (filteredData.length < 2) return 0;
    
    const firstPrice = filteredData[0].value;
    const lastPrice = filteredData[filteredData.length - 1].value;
    
    return ((lastPrice - firstPrice) / firstPrice) * 100;
  }, [filteredData]);
  
  const chartColor = priceChange >= 0 ? "var(--success)" : "var(--danger)";
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = date.toLocaleDateString([], { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      return (
        <div style={{ backgroundColor: 'var(--surface-alt)', padding: '8px', borderRadius: '6px', border: '1px solid var(--brand)' }}>
          <p className="font-medium text-base text-sm leading-5">{formattedDate}</p>
          <p className="text-info text-sm leading-5">
            Price: {formatTooltipValue(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const handleZoomStart = (e) => {
    if (!e) return;
    
    setZoomState({
      ...zoomState,
      refAreaLeft: e.activeLabel,
      isZooming: true
    });
  };
  
  const handleZoomMove = (e) => {
    if (!e || !zoomState.isZooming) return;
    
    setZoomState({
      ...zoomState,
      refAreaRight: e.activeLabel
    });
  };
  
  const handleZoomEnd = () => {
    if (!zoomState.refAreaLeft || !zoomState.refAreaRight) {
      setZoomState({
        ...zoomState,
        refAreaLeft: '',
        refAreaRight: '',
        isZooming: false
      });
      return;
    }
    
    let left = zoomState.refAreaLeft;
    let right = zoomState.refAreaRight;
    
    if (left > right) {
      [left, right] = [right, left];
    }
    
    setZoomState({
      left,
      right,
      refAreaLeft: '',
      refAreaRight: '',
      isZooming: false
    });
  };
  
  const handleResetZoom = () => {
    setZoomState({
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      isZooming: false
    });
  };
  
  const formatXAxisTick = (value) => {
    const date = new Date(value);
    if (timeRange === "1D") {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-base leading-7">Price Chart</h3>
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="flat"
            className="bg-surface-alt text-base border border-brand"
            isDisabled={zoomState.left === 'dataMin' && zoomState.right === 'dataMax'}
            onPress={handleResetZoom}
            startContent={<Icon icon="lucide:zoom-out" className="text-sm text-muted" />}
          >
            Reset Zoom
          </Button>
          
          <div className="flex gap-2">
            {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? "solid" : "flat"}
                className={timeRange === range ? "bg-accent text-base" : "bg-surface-alt text-base"}
                onPress={() => {
                  setTimeRange(range);
                  handleResetZoom();
                }}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="h-[400px] w-full bg-surface rounded-xl p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            onMouseDown={handleZoomStart}
            onMouseMove={handleZoomMove}
            onMouseUp={handleZoomEnd}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-alt)" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#94a3b8' }}
              tickLine={{ stroke: '#94a3b8' }}
              axisLine={{ stroke: '#94a3b8' }}
              tickFormatter={formatXAxisTick}
              domain={[zoomState.left, zoomState.right]}
              type="category"
              allowDataOverflow
            />
            <YAxis 
              tick={{ fill: '#94a3b8' }}
              tickLine={{ stroke: '#94a3b8' }}
              axisLine={{ stroke: '#94a3b8' }}
              tickFormatter={formatYAxis}
              domain={['auto', 'auto']}
              allowDataOverflow
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={chartColor} 
              fillOpacity={1}
              fill="url(#colorGradient)" 
              strokeWidth={2}
              activeDot={{ r: 6, stroke: chartColor, strokeWidth: 2, fill: '#1e293b' }}
            />
            {zoomState.refAreaLeft && zoomState.refAreaRight ? (
              <ReferenceArea
                x1={zoomState.refAreaLeft}
                x2={zoomState.refAreaRight}
                strokeOpacity={0.3}
                fill="#38bdf8"
                fillOpacity={0.2}
              />
            ) : null}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 text-center text-xs text-[#94a3b8] leading-4">
        Click and drag on the chart to zoom in. Use the Reset Zoom button to zoom out.
      </div>
    </div>
  );
};

export default MainChart;