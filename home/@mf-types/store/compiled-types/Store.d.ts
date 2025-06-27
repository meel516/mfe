import { Store } from 'redux';
export interface RootState {
    user: {
        name: string;
        isLoggenedIn: boolean;
        accessToken: string;
    };
}
declare const store: Store<RootState>;
export default store;
