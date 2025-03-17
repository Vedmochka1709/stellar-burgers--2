import feedsReducer, { initialState, fetchFeeds } from './feedSlice';

/*export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};*/

describe('feedSlice test', () => {
  it('action Pending test', () => {
    const newState = feedsReducer(initialState, fetchFeeds.pending(''));

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('action Fulfilled test', () => {
    const orders = [
      {
        _id: '12345',
        status: 'pending',
        name: 'order_1',
        createdAt: '2025-01-19',
        updatedAt: '2025-01-19',
        number: 1,
        ingredients: ['ingredient_1', 'ingredient2']
      }
    ];
    const total = 1;
    const totalToday = 1;

    const newState = feedsReducer(
      initialState,
      fetchFeeds.fulfilled(
        {
          success: true,
          orders: orders,
          total: total,
          totalToday: totalToday
        },
        ''
      )
    );

    expect(newState).toEqual({
      orders: orders,
      total: total,
      totalToday: totalToday,
      loading: false,
      error: null
    });
  });

  it('action Rejected test', () => {
    const error = new Error('error massage');
    const newState = feedsReducer(initialState, fetchFeeds.rejected(error, ''));

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('error massage');
  });
});
