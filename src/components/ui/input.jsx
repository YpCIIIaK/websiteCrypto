export function Input(props) {
  const { className = '', ...rest } = props;
  return (
    <input
      className={`border border-[#2e4d3a] rounded-xl px-4 py-2 bg-[#1e2d23]/80 text-base text-[#eaf7f0] placeholder:text-[#a3bdb3] focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none transition-all duration-200 shadow-sm focus:shadow-lg ${className}`}
      {...rest}
    />
  );
} 