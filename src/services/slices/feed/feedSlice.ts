import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../../store';

export const getFeeds = createAsyncThunk('feeds/all', getFeedsApi);

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    getFeedOrder: (state) => state.orders,
    getFeedSelector: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const getFeedState = (state: RootState) => state.feed;
export const { getFeedOrder, getFeedSelector } = feedSlice.selectors;
