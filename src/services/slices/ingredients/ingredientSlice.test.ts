import {
  ingredientReducer,
  TIngredientState,
  getIngredients
} from './ingredientSlice';

import { TIngredient } from '@utils-types';

describe('Тесты асинхронных экшенов', () => {
  describe('Тестируем getIngredients', () => {
    test('Тестируем отправку запроса(pending)', async () => {
      const initialState: TIngredientState = {
        ingredients: [],
        buns: [],
        mains: [],
        sauces: [],
        loading: false,
        error: null
      };

      const newState = ingredientReducer(
        initialState,
        getIngredients.pending('pending')
      );

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('Тестируем ошибку при запросе (rejected)', async () => {
      const initialState: TIngredientState = {
        ingredients: [],
        buns: [],
        mains: [],
        sauces: [],
        loading: false,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Ошибка при получении ингредиентов'
      };

      const newState = ingredientReducer(
        initialState,
        getIngredients.rejected(error, 'rejected')
      );

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('Тестируем успешный запрос (fulfilled)', async () => {
      const initialState: TIngredientState = {
        ingredients: [],
        buns: [],
        mains: [],
        sauces: [],
        loading: false,
        error: null
      };

      const mockIngredients = [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main'
        },
        { _id: '643d69a5c3f7b9001cfa0942', name: 'Соус Spicy-X', type: 'sauce' }
      ] as TIngredient[];

      const newState = ingredientReducer(
        initialState,
        getIngredients.fulfilled(mockIngredients, 'fulfilled')
      );

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toEqual(mockIngredients);
      expect(newState.buns).toEqual([mockIngredients[0]]);
      expect(newState.mains).toEqual([mockIngredients[1]]);
      expect(newState.sauces).toEqual([mockIngredients[2]]);
    });
  });
});
