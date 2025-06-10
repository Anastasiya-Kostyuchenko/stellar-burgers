import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';
import { v4 as uuidv4 } from 'uuid';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const orderBurger = createAsyncThunk(
  'user/order',
  async (data: string[]) => orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action) => {
      const indexToRemove = state.ingredients.findIndex(
        (i) => i._id === action.payload
      );
      if (indexToRemove !== -1) {
        state.ingredients.splice(indexToRemove, 1);
      }
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const temp = state.ingredients[index - 1];
        state.ingredients[index - 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length - 1) {
        const temp = state.ingredients[index + 1];
        state.ingredients[index + 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    resetModal: (state) => (state = initialState),
    clearAll: (state) => (state = initialState)
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetModal,
  clearAll
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
export const getConstructorState = (state: RootState) =>
  state.constructorBurger;
export const { getConstructorSelector } = constructorSlice.selectors;
