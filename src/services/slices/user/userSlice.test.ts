import {
  initialState,
  register,
  login,
  logout,
  getUser,
  updateUser,
  userReducer
} from './userSlice';
import { TUser } from '@utils-types';
import { Action } from '@reduxjs/toolkit';

describe('Тесты асинхронных экшенов', () => {
  const mockUser: TUser = {
    name: 'testaccount#1@test.ru',
    email: 'testaccount#1@test.ru'
  };

  test('Тестируем начальное состояние', () => {
    expect(userReducer(undefined, {} as Action)).toEqual(initialState);
  });

  test('Регистрация.Тестируем отправку запроса(pending)', () => {
    const action = { type: register.pending.type };
    const state = userReducer(initialState, action);
    expect(state.error).toBeNull();
  });

  test('Регистрация.Тестируем успешный запрос(fulfilled)', () => {
    const action = {
      type: register.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state.isAuthChecked).toBeTruthy();
    expect(state.user).toEqual(mockUser);
  });

  test('Регистрация.Тестируем ошибку при запросе(rejected)', () => {
    const action = {
      type: register.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const state = userReducer(initialState, action);
    expect(state.error).toBe(action.error.message);
  });

  test('Вход.Тестируем отправку запроса(pending)', () => {
    const action = { type: login.pending.type };
    const state = userReducer(initialState, action);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBeFalsy();
  });

  test('Вход.Тестируем успешный запрос(fulfilled)', () => {
    const action = { type: login.fulfilled.type, payload: { user: mockUser } };
    const state = userReducer(initialState, action);
    expect(state.isAuthChecked).toBeTruthy();
    expect(state.user).toEqual(mockUser);
  });

  test('Вход.Тестируем ошибку при запросе(rejected)', () => {
    const action = {
      type: login.rejected.type,
      error: { message: 'Ошибка авторизации' }
    };
    const state = userReducer(initialState, action);
    expect(state.error).toBe(action.error.message);
  });

  test('Выход.Тестируем успешный запрос(fulfilled)', () => {
    const action = { type: logout.fulfilled.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
  describe('Тестируем getUser', () => {
    test('Тестируем отправку запроса(pending)', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.error).toBeNull();
      expect(state.isAuthChecked).toBeFalsy();
    });

    test('Тестируем успешный запрос (fulfilled)', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userReducer(initialState, action);
      expect(state.isAuthChecked).toBeTruthy();
      expect(state.user).toEqual(mockUser);
    });

    test('Тестируем ошибку при запросе (rejected)', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Ошибка получения пользователя' }
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(action.error.message);
    });

    describe('Тестируем updateUser', () => {
      test('Тестируем отправку запроса(pending)', () => {
        const action = { type: updateUser.pending.type };
        const state = userReducer(initialState, action);
        expect(state.isAuthChecked).toBeFalsy();
      });

      test('Тестируем успешный запрос (fulfilled)', () => {
        const action = {
          type: updateUser.fulfilled.type,
          payload: { user: mockUser }
        };
        const state = userReducer(initialState, action);
        expect(state.user).toEqual(mockUser);
        expect(state.isAuthChecked).toBeTruthy();
      });

      test('Тестируем ошибку при запросе (rejected)', () => {
        const action = {
          type: updateUser.rejected.type,
          error: { message: 'Ошибка обновления пользователя' }
        };
        const state = userReducer(initialState, action);
        expect(state.error).toBe(action.error.message);
      });
    });
  });
});
