import { initialState as initialStateIngredientReducer } from '../services/slices/ingredientsSlice';
import { initialState as initialStateConstructorReducer } from '../services/slices/constructorSlice';
import { initialState as initialStateFeedReducer } from '../services/slices/feedSlice';
import { initialState as initialStateUserReducer } from '../services/slices/userSlice';
import { initialState as initialStateOrderReducer } from '../services/slices/orderSlice';
import store from './store';

const initialState = {
  ingredients: initialStateIngredientReducer,
  burger: initialStateConstructorReducer,
  feeds: initialStateFeedReducer,
  user: initialStateUserReducer,
  order: initialStateOrderReducer
};

describe('rootReducer test', () => {
  beforeEach(() => {
    store.dispatch({ type: 'RESET_STATE' });
  });

  it('correct initialization', () => {
    const state = store.getState();
    expect(state).toEqual(initialState);
  });

  it('test with an action that is not handled by any reducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    store.dispatch(action);
    const state = store.getState();
    expect(state).toEqual(initialState);
  });
});
