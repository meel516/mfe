import { UserState } from "./slices/userSlice.ts";
import { commentSlice } from "./slices/commentsSlice.ts";
export type RootState = {
    user: UserState;
    comments: commentSlice;
};
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    user: UserState;
    comments: commentSlice;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("@reduxjs/toolkit").ThunkDispatch<{
        user: UserState;
        comments: commentSlice;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type AppDispatch = typeof store.dispatch;
export default store;
