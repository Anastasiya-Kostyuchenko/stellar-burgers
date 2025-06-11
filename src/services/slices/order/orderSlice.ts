import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../../store';

export const getOrderDetails = createAsyncThunk(
  'orders/getOrdersDetails',
  orderBurgerApi
);

export type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

export const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'orderDetails',
  initialState,
  selectors: {
    getOrderRequest: (state) => state.loading,
    getOrderModalData: (state) => state.order
  },
  reducers: {
    clearOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка при получении данных заказа';
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const getOrderState = (state: RootState) => state.order;
export const { clearOrder } = orderSlice.actions;
