import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrder = createAsyncThunk('orders/getOrders', async () => {
  const orders = await getOrdersApi();
  return orders;
});

export type TUserState = {
  orders: TOrder[];
};

export const initialState: TUserState = {
  orders: []
};

export const userOrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const userOrderReducer = userOrderSlice.reducer;
