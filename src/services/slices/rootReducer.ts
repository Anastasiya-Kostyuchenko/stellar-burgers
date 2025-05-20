import { combineReducers } from '@reduxjs/toolkit';
import { ingredientReducer } from './ingredientSlice';
import { constructorReducer } from './constructorSlice';
import { feedReducer } from './feedSlice';
import { userReducer } from './userSlice';
import { orderReducer } from './orderSlice';
import { userOrderReducer } from './userOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  constructorBurger: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  userOrder: userOrderReducer,
  order: orderReducer
});
