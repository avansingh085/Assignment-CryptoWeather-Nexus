import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCryptoData } from '@/services/cryptoApi';

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async (ids) => {
  try {
    const response = await fetchCryptoData(ids);
    console.log('Crypto API response:', response);
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { data: [], loading: false, error: null, notification: null },
  reducers: {
    updateCrypto: (state, action) => {
      if (!Array.isArray(state.data)) {
        state.data = []; 
      }

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
        state.error = null; 
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch crypto data';
      });
  },
});

export const { updateCrypto, clearNotification } = cryptoSlice.actions;
export default cryptoSlice.reducer;
