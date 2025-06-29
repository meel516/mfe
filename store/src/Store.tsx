// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./slices/userSlice.ts";
import commentsReducer, { commentSlice } from "./slices/commentsSlice.ts";
export type RootState = {
  user: UserState;
  comments: commentSlice;
};
const store = configureStore({
  reducer: {
    user: userReducer,
    comments: commentsReducer,
  },
});

// Inferred type for the RootState

export type AppDispatch = typeof store.dispatch;

export default store;
