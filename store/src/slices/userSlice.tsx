// userSlice.ts

// 1. Define the state shape
interface UserState {
  name: string;
  isLoggenedIn: boolean;
  accessToken: string;
}

// 2. Initial state
const initialState: UserState = {
  name: 'zhangsan',
  isLoggenedIn: true,
  accessToken: '',
};

// 3. Define action types as constants
const SET_NAME = 'user/setName' as const;
const SET_LOGGED_IN = 'user/setIsLoggenedIn' as const;
const LOGOUT = 'user/logout' as const;
const SET_ACCESS_TOKEN = 'user/setAccessToken' as const;

// 4. Define action type shapes
interface SetNameAction {
  type: typeof SET_NAME;
  payload: string;
}

interface SetLoggedInAction {
  type: typeof SET_LOGGED_IN;
  payload: boolean;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface SetAccessTokenAction {
  type: typeof SET_ACCESS_TOKEN;
  payload: string;
}

// 5. Union type for all actions
type UserAction =
  | SetNameAction
  | SetLoggedInAction
  | LogoutAction
  | SetAccessTokenAction;

// 6. Reducer
export default function userReducer(
  state: UserState = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_LOGGED_IN:
      return { ...state, isLoggenedIn: action.payload };
    case LOGOUT:
      return { ...state, isLoggenedIn: false };
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
}

// 7. Action Creators
export const setName = (name: string): SetNameAction => ({
  type: SET_NAME,
  payload: name,
});

export const setIsLoggenedIn = (status: boolean): SetLoggedInAction => ({
  type: SET_LOGGED_IN,
  payload: status,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});

export const setAccessToken = (token: string): SetAccessTokenAction => ({
  type: SET_ACCESS_TOKEN,
  payload: token,
});
