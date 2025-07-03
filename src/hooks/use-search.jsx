import { useState, useMemo } from 'react'

export const useSearch = (data) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    
    return data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.rank - b.rank)
  }, [data, searchTerm])

  return {
    searchTerm,
    setSearchTerm,
    showSuggestions,
    setShowSuggestions,
    filteredData
  }
} 