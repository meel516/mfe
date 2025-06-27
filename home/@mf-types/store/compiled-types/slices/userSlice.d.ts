interface UserState {
    name: string;
    isLoggenedIn: boolean;
    accessToken: string;
}
declare const SET_NAME: "user/setName";
declare const SET_LOGGED_IN: "user/setIsLoggenedIn";
declare const LOGOUT: "user/logout";
declare const SET_ACCESS_TOKEN: "user/setAccessToken";
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
type UserAction = SetNameAction | SetLoggedInAction | LogoutAction | SetAccessTokenAction;
export default function userReducer(state: UserState, action: UserAction): UserState;
export declare const setName: (name: string) => SetNameAction;
export declare const setIsLoggenedIn: (status: boolean) => SetLoggedInAction;
export declare const logout: () => LogoutAction;
export declare const setAccessToken: (token: string) => SetAccessTokenAction;
export {};
