export const formatNumber = (num) => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
  return `$${num.toFixed(2)}`
}

export const formatPrice = (price) => {
  if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return `$${price.toFixed(4)}`
}

export const formatPercent = (percent) => {
  const formatted = Math.abs(percent).toFixed(2)
  return percent >= 0 ? `+${formatted}%` : `-${formatted}%`
} 