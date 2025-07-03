export function Badge({ children, className = "", ...props }) {
  return <span className={`inline-block px-2 py-1 rounded bg-accent text-base text-xs font-bold ${className}`} {...props}>{children}</span>;
} 