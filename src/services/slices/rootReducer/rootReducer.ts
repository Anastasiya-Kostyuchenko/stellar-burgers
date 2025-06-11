import { combineReducers } from '@reduxjs/toolkit';
import { ingredientReducer } from '../ingredients/ingredientSlice';
import { constructorReducer } from '../constructor/constructorSlice';
import { feedReducer } from '../feed/feedSlice';
import { userReducer } from '../user/userSlice';
import { orderReducer } from '../order/orderSlice';
import { userOrderReducer } from '../userOrder/userOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  constructorBurger: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  userOrder: userOrderReducer,
  order: orderReducer
});
