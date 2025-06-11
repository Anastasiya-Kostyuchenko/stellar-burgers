import { TFeedState, getFeeds, feedReducer } from './feedSlice';
import { TFeedsResponse } from '@api';

describe('Тесты асинхронных экшенов', () => {
  describe('Тестируем getFeeds', () => {
    test('Тестируем отправку запроса(pending)', async () => {
      const initialState: TFeedState = {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      };

      const newState = feedReducer(initialState, getFeeds.pending('pending'));

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
    });

    test('Тестируем успешный запрос (fulfilled)', async () => {
      const initialState: TFeedState = {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      };

      const mockOrders = [
        {
          _id: 'testid1',
          status: 'done',
          name: 'test order 1',
          createdAt: '2024-04-27T07:39:15.703Z',
          updatedAt: '2024-04-27T07:39:16.203Z',
          number: 1,
          ingredients: [
            '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
            'b097fe74-75a2-4fa2-b193-86f97909b839',
            '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
          ]
        },
        {
          _id: 'testid2',
          status: 'done',
          name: 'test order 2',
          createdAt: '2024-04-27T07:49:15.703Z',
          updatedAt: '2024-04-27T07:49:16.203Z',
          number: 2,
          ingredients: [
            '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
            'df0670f4-6435-4384-b75a-3ee0fa49a29a',
            '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
          ]
        },
        {
          _id: 'testid3',
          status: 'done',
          name: 'test order 3',
          createdAt: '2024-04-27T07:59:15.703Z',
          updatedAt: '2024-04-27T07:59:16.203Z',
          number: 3,
          ingredients: [
            '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
            'df0670f4-6435-4384-b75a-3ee0fa49a29a',
            'b097fe74-75a2-4fa2-b193-86f97909b839',
            '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
          ]
        }
      ];

      const feeds: TFeedsResponse = {
        orders: mockOrders,
        total: 10,
        totalToday: 20,
        success: true
      };

      const newState = feedReducer(
        initialState,
        getFeeds.fulfilled(feeds, 'fulfilled')
      );

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBeNull();
      expect(newState.orders).toEqual(mockOrders);
      expect(newState.total).toEqual(10);
      expect(newState.totalToday).toEqual(20);
    });
  });
});
