import {
  initialState,
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  resetModal,
  clearAll,
  constructorReducer,
  TConstructorState
} from './constructorSlice';
import { v4 as uuidv4 } from 'uuid';

describe('Burger Reducer', () => {
  const mockIngredients = [
    {
      _id: '1',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      id: uuidv4()
    },
    {
      _id: '2',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01.png',
      id: uuidv4()
    }
  ];

  const addingMockIngredient = {
    _id: '3',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    id: uuidv4()
  };

  test('Тестируем добавление ингредиента', () => {
    const state: TConstructorState = {
      ...initialState,
      ingredients: []
    };

    const action = addIngredient(addingMockIngredient);
    const newState = constructorReducer(state, action);

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...addingMockIngredient,
      id: expect.any(String)
    });
  });

  test('Тестируем удаление ингредиента', () => {
    const state: TConstructorState = {
      ...initialState,
      ingredients: mockIngredients
    };

    const action = removeIngredient('1');
    const newState = constructorReducer(state, action);

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]._id).toBe('2');
  });

  test('Тестируем перемещение элемента вверх', () => {
    const state: TConstructorState = {
      ...initialState,
      ingredients: mockIngredients
    };

    const action = moveIngredientUp(1);
    const newState = constructorReducer(state, action);

    expect(newState.ingredients[0]._id).toBe('2');
    expect(newState.ingredients[1]._id).toBe('1');
  });

  test('Перемещение элемента вниз', () => {
    const state: TConstructorState = {
      ...initialState,
      ingredients: mockIngredients
    };

    const action = moveIngredientDown(0);
    const newState = constructorReducer(state, action);

    expect(newState.ingredients[0]._id).toBe('1');
    expect(newState.ingredients[1]._id).toBe('2');
  });

  test('Тестируем сброс данных модального окна', () => {
    const state: TConstructorState = {
      ...initialState,
      ingredients: mockIngredients
    };

    const action = resetModal();
    const newState = constructorReducer(state, action);

    expect(newState).toEqual(initialState);
  });

  test('Тестируем очистку всех данных в конструкторе', () => {
    const state: TConstructorState = {
      ...initialState,
      ingredients: mockIngredients
    };

    const action = clearAll();
    const newState = constructorReducer(state, action);

    expect(newState).toEqual(initialState);
  });
});
