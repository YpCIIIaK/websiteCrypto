import { useState, useEffect } from 'react'
import { mockCryptoData } from '../utils/mockData'

export const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Симуляция загрузки данных
    setTimeout(() => {
      setCryptoData(mockCryptoData)
      setLoading(false)
    }, 1000)
  }, [])

  return { cryptoData, loading }
} 