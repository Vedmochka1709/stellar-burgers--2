import store from '../store';
import {
  initialState,
  addBurgerIngredient,
  removeBurgerIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import constructorReducer from './constructorSlice';

/*export const initialState: TBurgerState = {
  bun: null,
  ingredients: []
};*/

describe('constructorSlice test', () => {
  const ingredient1 = {
    _id: '1',
    id: '1',
    name: 'ingredient1',
    type: 'ingredient',
    proteins: 100,
    fat: 5,
    carbohydrates: 1,
    calories: 400,
    price: 120,
    image: 'ingredient.jpg',
    image_large: 'ingredient_large.jpg',
    image_mobile: 'ingredient_mobile.jpg'
  };

  const ingredient2 = {
    _id: '2',
    id: '2',
    name: 'ingredient2',
    type: 'ingredient',
    proteins: 110,
    fat: 7,
    carbohydrates: 8,
    calories: 200,
    price: 1100,
    image: 'ingredient2.jpg',
    image_large: 'ingredient_large2.jpg',
    image_mobile: 'ingredient_mobile2.jpg'
  };

  it('add Ingredient test', () => {
    const newState = constructorReducer(
      initialState,
      addBurgerIngredient(ingredient1)
    );

    const expectedState = {
      ...initialState,
      ingredients: [...initialState.ingredients, ingredient1]
    };

    expect(newState).toEqual(expectedState);
  });

  it('delete Ingredient test', () => {
    const initialStateTest = {
      ...initialState,
      ingredients: [...initialState.ingredients, ingredient1]
    };

    const newState = constructorReducer(
      initialStateTest,
      removeBurgerIngredient(ingredient1.id)
    );

    expect(newState).toEqual(initialState);
  });

  it('reorder ingredients test', () => {
    const initialStateTest = {
      ...initialState,
      ingredients: [...initialState.ingredients, ingredient1, ingredient2]
    };
    const newState = constructorReducer(
      initialStateTest,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(newState).toEqual({
      bun: null,
      ingredients: [...initialState.ingredients, ingredient2, ingredient1]
    });
  });

  it('clear constructor test', () => {
    const initialStateTest = {
      ...initialState,
      ingredients: [...initialState.ingredients, ingredient1, ingredient2]
    };
    const newState = constructorReducer(initialStateTest, clearConstructor());

    expect(newState).toEqual(initialState);
  });
});
