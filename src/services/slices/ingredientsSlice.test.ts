import { initialState, fetchIngredients } from './ingredientsSlice';
import ingredientsReducer from './ingredientsSlice';

/*export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};*/

describe('ingredientSlice test', () => {
  
  it('action Pending test', () => {
    const newState = ingredientsReducer(initialState, fetchIngredients.pending(''));

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('action Fulfilled test', () => {
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
  
    const ingredients = [ingredient1, ingredient2];
    
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(ingredients, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(ingredients);
  });

  it('action Rejected test', () => {
    const error = new Error('error massage');
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(error, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('error massage');
  });

});
