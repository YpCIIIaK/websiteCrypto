import React from "react";

/**
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @param {number} [current] - текущее значение (если не передано, берётся случайное между min и max)
 */
const HighLowSlider = ({ min, max, current }) => {
  // Если current не передан или невалиден — генерируем случайное значение между min и max
  const isValid = typeof current === 'number' && !isNaN(current) && isFinite(current);
  const randomCurrent = React.useMemo(() => min + Math.random() * (max - min), [min, max]);
  const value = isValid ? current : randomCurrent;
  const percent = (max !== min) ? ((value - min) / (max - min)) * 100 : 50;
  const format = (v) => (typeof v === 'number' && isFinite(v)) ? Number(v).toFixed(2) : '—';

  return (
    <div className="bg-surface-alt rounded-xl p-6 border border-brand w-full max-w-lg mx-auto">
      <h3 className="text-base font-semibold mb-4">Min/Max Prices</h3>
      <div className="flex justify-between text-base mb-1">
        <div className="flex flex-col items-start">
          <span className="text-base font-bold">{format(min)}</span>
          <span className="text-muted text-xs">Low</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-base font-bold">{format(max)}</span>
          <span className="text-muted text-xs">High</span>
        </div>
      </div>
      <div className="relative h-24 flex items-center">
        {/* Ось */}
        <div className="absolute left-0 right-0 top-1/2 h-1 rounded" style={{ background: 'rgba(234, 247, 240, 0.7)', transform: 'translateY(-50%)' }}></div>
        {/* Кружок Current */}
        <div
          className="absolute flex flex-col items-center"
          style={{ left: `calc(${percent}% )`, transform: 'translateX(-50%)' }}
        >
          <div className="w-5 h-5 rounded-full bg-base border-2 border-white shadow" style={{ marginTop: '12px' }}></div>
          <div className="text-xs text-base text-center mt-2">{format(value)}</div>
          <div className="text-muted text-xs text-center">Current</div>
        </div>
      </div>
    </div>
  );
};

export default HighLowSlider; 