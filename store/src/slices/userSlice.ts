// userSlice.ts (modern version)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  isLoggedIn: boolean;
  accessToken: string;
  userId: string;
}

const initialState: UserState = {
  name: "zhangsan",
  isLoggedIn: true,
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1kLnNhbGVlbTUxNkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2ODVkYzVmN2JiYmFlYmQ0N2IwNWNkOTUiLCJpYXQiOjE3NTExODEzODh9.H4ijkm5HjRuE168O9PakPD2i-BYuChGijJtwqISjSSU",
  userId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
});

export const { setName, setLoggedIn, logout, setAccessToken, setUserId } =
  userSlice.actions;

export default userSlice.reducer;
