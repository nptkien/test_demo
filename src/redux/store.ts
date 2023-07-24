import { Action, ThunkDispatch, configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/auth';
import counterReducer from './slices/counterSlice'
export const store = configureStore({
    reducer: combineReducers({
        authState: authReducer,
        counter: counterReducer,

    }),
    middleware: (getDefaultMiddle) => getDefaultMiddle({ serializableCheck: false }),

});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<AppState, void, Action>;
