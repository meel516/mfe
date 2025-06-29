// userSlice.ts (modern version)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface commentSlice {
  blogId: string;
}

const initialState: commentSlice = {
  blogId: "saleem",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setBlogId(state, action: PayloadAction<string>) {
      state.blogId = action.payload;
    },
  },
});

export const { setBlogId } = commentsSlice.actions;

export default commentsSlice.reducer;
