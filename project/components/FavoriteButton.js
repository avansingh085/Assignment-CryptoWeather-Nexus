'use client'; 
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/redux/favoritesSlice'; 

export default function FavoriteButton({ type, id }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites[type]) || []; 
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(`${type}-favorites`);
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
     
      if (favorites.length === 0 && parsedFavorites.length > 0) {
        parsedFavorites.forEach((favId) => {
          if (!favorites.includes(favId)) {
            dispatch(toggleFavorite({ type, id: favId }));
          }
        });
      }
    }
  }, [dispatch, type]); 
  useEffect(() => {
    localStorage.setItem(`${type}-favorites`, JSON.stringify(favorites));
  }, [favorites, type]); 

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