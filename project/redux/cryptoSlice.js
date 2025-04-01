import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCryptoData } from '@/services/cryptoApi';

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async (ids) => {
  return await fetchCryptoData(ids);
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { data: [], loading: false, error: null, notification: null },
  reducers: {
    updateCrypto: (state, action) => {
      const { id, priceUsd, type } = action.payload;
      const coin = state.data.find((c) => c.id === id);
      if (coin) {
        coin.priceUsd = priceUsd;
        state.notification = { id, priceUsd, type };
      }
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateCrypto, clearNotification } = cryptoSlice.actions;
export default cryptoSlice.reducer;