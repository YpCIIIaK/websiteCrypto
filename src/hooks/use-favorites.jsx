import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'crypto_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error reading favorites from localStorage', error);
      setFavorites([]);
    }
  }, []);

  const toggleFavorite = (symbol) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(symbol)
        ? prevFavorites.filter(s => s !== symbol)
        : [...prevFavorites, symbol];
      
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error('Error writing favorites to localStorage', error);
      }
      
      return newFavorites;
    });
  };

  return { favorites, toggleFavorite };
}; 