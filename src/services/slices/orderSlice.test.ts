import orderReducer, {
  initialState,
  fetchOrders,
  fetchOrderByNumber,
  orderBurger
} from './orderSlice';

/*export const initialState: TOrderState = {
  orderData: null,
  name: '',
  orders: [],
  orderRequest: false,
  error: null
};*/

describe('orderSlice test', () => {
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

  const order1 = {
    _id: '12345',
    status: 'pending',
    name: 'order_1',
    createdAt: '2025-01-19',
    updatedAt: '2025-01-19',
    number: 1,
    ingredients: [ingredient1._id]
  };

  const order2 = {
    _id: '12346',
    status: 'pending',
    name: 'order_2',
    createdAt: '2025-01-19',
    updatedAt: '2025-01-19',
    number: 2,
    ingredients: [ingredient1._id]
  };

  const orders = [order1, order2];

  // Pending tests
  it('action Pending test fetchOrders', () => {
    const newState = orderReducer(initialState, fetchOrders.pending(''));

    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('action Pending test fetchOrderByNumber', () => {
    const newState = orderReducer(
      initialState,
      fetchOrderByNumber.pending('', order1.number)
    );

    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('action Pending test orderBurger', () => {
    const newState = orderReducer(
      initialState,
      orderBurger.pending('', [ingredient1._id])
    );

    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBe(null);
  });

  // Fulfilled tests
  const OrderResponse = {
    success: true,
    order: order1,
    name: 'Burger',
    orders: orders
  };

  it('action Fulfilled test orderBurger', () => {
    const newState = orderReducer(
      initialState,
      orderBurger.fulfilled(OrderResponse, '', [ingredient1._id])
    );

    expect(newState.orderRequest).toEqual(false);
    expect(newState.orderData).toEqual(order1);
    expect(newState.name).toEqual('Burger');
    expect(newState.orders).toEqual([order1]);
  });

  it('action Fulfilled test fetchOrderByNumber', () => {
    const newState = orderReducer(
      initialState,
      fetchOrderByNumber.fulfilled(OrderResponse, '', order1.number)
    );

    expect(newState.orderRequest).toEqual(false);
    expect(newState.orderData).toEqual(order1);
  });

  it('action Fulfilled test fetchOrders', () => {
    const newState = orderReducer(
      initialState,
      fetchOrders.fulfilled(orders, '')
    );

    expect(newState.orderRequest).toEqual(false);
    expect(newState.orders).toEqual(orders);
  });

  // Rejected tests
  const error = new Error('error massage');

  it('action Rejected test fetchOrders', () => {
    const newState = orderReducer(
      initialState,
      fetchOrders.rejected(error, '')
    );

    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe('error massage');
  });

  it('action Rejected test fetchOrderByNumber', () => {
    const newState = orderReducer(
      initialState,
      fetchOrderByNumber.rejected(error, '', order1.number)
    );

    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe('error massage');
  });

  it('action Rejected test orderBurger', () => {
    const newState = orderReducer(
      initialState,
      orderBurger.rejected(error, '', [ingredient1._id])
    );

    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe('error massage');
  });
});
