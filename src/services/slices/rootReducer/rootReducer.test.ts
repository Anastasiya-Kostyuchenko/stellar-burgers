import { ingredientReducer } from '../ingredients/ingredientSlice';
import { feedReducer } from '../feed/feedSlice';
import { orderReducer } from '../order/orderSlice';
import { userReducer } from '../user/userSlice';
import { userOrderReducer } from '../userOrder/userOrderSlice';
import { constructorReducer } from '../constructor/constructorSlice';
import { rootReducer } from './rootReducer';
import { combineReducers } from '@reduxjs/toolkit';

const expectedRootReducer = combineReducers({
  ingredients: ingredientReducer,
  constructorBurger: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  userOrder: userOrderReducer,
  order: orderReducer
});

test('Тестируем rootReducer', () => {
  const UNKNOWN_ACTION = { type: 'UNKNOWN_ACTION' };
  const APP_INIT = { type: 'APP_INIT' };
  const initialState = expectedRootReducer(undefined, UNKNOWN_ACTION);
  expect(rootReducer(undefined, APP_INIT)).toEqual(initialState);
});
