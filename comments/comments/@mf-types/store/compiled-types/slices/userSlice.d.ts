export interface UserState {
    name: string;
    isLoggedIn: boolean;
    accessToken: string;
    userId: string;
}
export declare const setName: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "user/setName">, setLoggedIn: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<boolean, "user/setLoggedIn">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/logout">, setAccessToken: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "user/setAccessToken">, setUserId: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "user/setUserId">;
declare const _default: import("redux").Reducer<UserState>;
export default _default;
