import userReducer, {
  initialState,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  logout
} from './userSlice';

/*export const initialState: TUserState = {
    userData: null,
    registerData: {
      email: '',
      name: '',
      password: ''
    },
    isAuthChecked: true,
    isAuthenticated: false,
    error: null,
    loading: false
  };*/

describe('userSlice', () => {
  // Pending tests
  function pendingAction(action: any) {
    const newState = userReducer(initialState, action.pending(''));
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
    expect(newState.isAuthChecked).toBe(true);
  }

  it('action Pending test getUser', () => {
    pendingAction(getUser);
  });

  it('action Pending test registerUser', () => {
    pendingAction(registerUser);
  });

  it('action Pending test loginUser', () => {
    pendingAction(loginUser);
  });

  it('action Pending test updateUser', () => {
    pendingAction(updateUser);
  });

  it('action Pending test logout', () => {
    pendingAction(logout);
  });

  // Fulfilled tests
  const user = {
    email: 'test@test.com',
    name: 'test',
    _id: '12345'
  };
  const userResponse = {
    success: true,
    user: user
  };

  const loginData = {
    email: 'test@test.com',
    password: '12345'
  };

  const authResponse = {
    success: true,
    refreshToken: '12345',
    accessToken: '12345',
    user: user
  };

  function fulfilledAction(newState: any, action: any) {
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
  }

  it('action Fulfilled test getUser', () => {
    const newState = userReducer(
      initialState,
      getUser.fulfilled(userResponse, '')
    );

    expect(newState.userData).toEqual(userResponse.user);
    fulfilledAction(newState, getUser);
  });

  it('action Fulfilled test loginUser', () => {
    const newState = userReducer(
      initialState,
      loginUser.fulfilled(authResponse, '', loginData)
    );

    expect(newState.userData).toEqual(authResponse.user);
    fulfilledAction(newState, loginUser);
  });

  it('action Fulfilled test updateUser', () => {
    const newState = userReducer(
      initialState,
      updateUser.fulfilled(authResponse, '', loginData)
    );

    expect(newState.userData).toEqual(authResponse.user);
    fulfilledAction(newState, updateUser);
  });

  it('action Fulfilled test logout', () => {
    const state = {
      ...initialState,
      user: {
        name: 'test',
        email: 'test@test.com'
      }
    };

    const newState = userReducer(state, logout.fulfilled(undefined, ''));

    expect(newState.userData).toEqual(null);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isAuthenticated).toBe(false);
  });

  // Rejected tests
  const error = new Error('error massage');

  function rejectedAction(action: any) {
    const newState = userReducer(initialState, action.rejected(error, ''));
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('error massage');
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isAuthenticated).toBe(false);
  }

  it('action Pending test getUser', () => {
    rejectedAction(getUser);
  });

  it('action Pending test registerUser', () => {
    rejectedAction(registerUser);
  });

  it('action Pending test loginUser', () => {
    rejectedAction(loginUser);
  });

  it('action Pending test updateUser', () => {
    rejectedAction(updateUser);
  });

  it('action Pending test logout', () => {
    rejectedAction(logout);
  });
});
