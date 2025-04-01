import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { city: [], crypto: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const { type, id } = action.payload;
      const list = state[type];
      if (list.includes(id)) {
        state[type] = list.filter((item) => item !== id);
      } else {
        state[type].push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;