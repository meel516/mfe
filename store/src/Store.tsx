// store.ts
import { createStore, combineReducers, Store } from 'redux';
import userReducer from './slices/userSlice.tsx'; // Importing user reducer

// 1. Define Root State Type
export interface RootState {
  user: {
    name: string;
    isLoggenedIn: boolean;
    accessToken: string;
  };
}

// 2. Combine reducers and get the type for the root state
const rootReducer = combineReducers({
  user: userReducer,
});

// 3. Create Store with RootState Type
const store: Store<RootState> = createStore(rootReducer);

export default store;
