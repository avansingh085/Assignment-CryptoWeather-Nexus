'use client'; // Required for Client Component in App Router

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/redux/favoritesSlice'; // Adjusted path (assuming redux/ is sibling to app/)

export default function FavoriteButton({ type, id }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites[type]) || []; // Redux state only
  const isFavorite = favorites.includes(id);

  // Load favorites from localStorage on mount and initialize Redux state
  useEffect(() => {
    const storedFavorites = localStorage.getItem(`${type}-favorites`);
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      // Only initialize if Redux state is empty and localStorage has data
      if (favorites.length === 0 && parsedFavorites.length > 0) {
        parsedFavorites.forEach((favId) => {
          if (!favorites.includes(favId)) {
            dispatch(toggleFavorite({ type, id: favId }));
          }
        });
      }
    }
  }, [dispatch, type]); // Run once on mount, no dependency on favorites

  // Sync Redux state to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(`${type}-favorites`, JSON.stringify(favorites));
  }, [favorites, type]); // Only runs when favorites or type changes

  const handleToggle = () => {
    dispatch(toggleFavorite({ type, id }));
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-1 rounded-full ${isFavorite ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-500`}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
}