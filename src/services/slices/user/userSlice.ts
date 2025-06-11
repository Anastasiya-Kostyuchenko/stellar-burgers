import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';

type TUserState = {
  isAuthChecked: boolean;
  user: TUser;
  error: string | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    name: '',
    email: ''
  },
  error: null
};

export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);
export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getIsAuthCheckedSelector: (state: TUserState) => state.isAuthChecked,
    getUserSelector: (state: TUserState) => state.user,
    getErrorSelector: (state: TUserState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка регистрации';
      });
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка авторизации';
      });
    builder.addCase(logout.fulfilled, (state) => (state = initialState));
    builder
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка получения пользователя';
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка обновления пользователя';
      });
  }
});

export const userReducer = userSlice.reducer;
export const { getIsAuthCheckedSelector, getUserSelector, getErrorSelector } =
  userSlice.selectors;
