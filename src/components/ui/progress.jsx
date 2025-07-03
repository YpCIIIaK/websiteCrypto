export function Progress({ value, max = 100, className = "", ...props }) {
  return (
    <div className={`w-full h-2 bg-surface-alt rounded ${className}`} {...props}>
      <div className="h-2 bg-success rounded" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
} 