export function Card({ children, className = "", ...props }) {
  return <div className={`bg-surface-alt rounded-2xl shadow p-4 ${className}`} {...props}>{children}</div>;
}

export function CardHeader({ children, className = "", ...props }) {
  return <div className={`mb-2 ${className}`} {...props}>{children}</div>;
}

export function CardTitle({ children, className = "", ...props }) {
  return <div className={`text-xl font-bold mb-2 ${className}`} {...props}>{children}</div>;
}

export function CardContent({ children, className = "", ...props }) {
  return <div className={className} {...props}>{children}</div>;
} 