import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export type TIngredientState = {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  loading: false,
  error: null
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    getIngredientState: (state) => state,
    getIngredientId: (state, payload): TIngredient | undefined =>
      state.ingredients.find((i) => i._id === payload.id)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
          state.buns = action.payload.filter((item) => item.type === 'bun');
          state.mains = action.payload.filter((item) => item.type === 'main');
          state.sauces = action.payload.filter((item) => item.type === 'sauce');
        }
      )
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка при получении ингредиентов';
      });
  }
});

export const ingredientReducer = ingredientSlice.reducer;
export const { getIngredientState, getIngredientId } =
  ingredientSlice.selectors;
