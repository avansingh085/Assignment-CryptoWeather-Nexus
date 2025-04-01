import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNewsData } from '@/services/newsApi';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {

    console.log(await fetchNewsData(),"AVAN SINGH")
  return await fetchNewsData();
});

const newsSlice = createSlice({
  name: 'news',
  initialState: { data: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;