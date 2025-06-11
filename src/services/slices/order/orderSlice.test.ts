import { TOrder } from '@utils-types';
import {
  orderReducer,
  TOrderState,
  clearOrder,
  getOrderDetails
} from './orderSlice';
import { TNewOrderResponse } from '@api';

const mockOrder = {
  _id: 'testOrderIdNew',
  status: 'new',
  name: 'test order',
  createdAt: '2024-04-27T07:59:55.703Z',
  updatedAt: '2024-04-27T07:59:56.203Z',
  number: 1,
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093d'
  ]
} as TOrder;

describe('Тесты синхронных экшенов', () => {
  test('Проверяем очистку заказа', () => {
    const initialState: TOrderState = {
      order: mockOrder,
      loading: false,
      error: null
    };

    const newOrder = orderReducer(initialState, clearOrder());

    expect(newOrder).toEqual({
      order: null,
      loading: false,
      error: null
    });
  });
});

describe('Тесты асинхронных экшенов', () => {
  describe('Тестируем getOrderDetails', () => {
    test('Тестируем отправку запроса(pending)', async () => {
      const initialState: TOrderState = {
        order: null,
        loading: false,
        error: null
      };

      const newState = orderReducer(
        initialState,
        getOrderDetails.pending('pending', mockOrder.ingredients)
      );

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('Тестируем ошибку при запросе(rejected)', async () => {
      const initialState: TOrderState = {
        order: null,
        loading: false,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Ошибка при получении данных заказа'
      };

      const newState = orderReducer(
        initialState,
        getOrderDetails.rejected(error, 'rejected', mockOrder.ingredients)
      );

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('Тестируем успешный запрос(fulfilled)', async () => {
      const initialState: TOrderState = {
        order: null,
        loading: false,
        error: null
      };

      const newOrder: TNewOrderResponse = {
        order: mockOrder,
        name: 'new order',
        success: true
      };

      const newState = orderReducer(
        initialState,
        getOrderDetails.fulfilled(newOrder, 'fulfilled', mockOrder.ingredients)
      );

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBeNull();
      expect(newState.order).toEqual(mockOrder);
    });
  });
});
