import { Action, ThunkDispatch, configureStore, combineReducers, Middleware } from '@reduxjs/toolkit'
import authReducer from './slices/auth';
import counterReducer from './slices/counterSlice';
const errorMiddleware: Middleware = store => next => action => {
    if (action.error) {
        // Xử lý các lỗi tại đây
        console.error("Có lỗi xảy ra:", action.error);
    }

    return next(action);
};

export const store = configureStore({
    reducer: combineReducers({
        authState: authReducer,
        counter: counterReducer,

    }),
    middleware: (getDefaultMiddle) => getDefaultMiddle({ serializableCheck: false }).concat(errorMiddleware),

});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<AppState, void, Action>;
