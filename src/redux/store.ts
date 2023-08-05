import { Action, ThunkDispatch, configureStore, combineReducers, Middleware, AnyAction } from '@reduxjs/toolkit'
import authReducer, { expriedToken } from './slices/auth';
import counterReducer from './slices/counterSlice';
import productReducer from './slices/products';
import ApiError from '../models/ApiError';
const errorMiddleware: Middleware = store => next => action => {
    if (action.error) {
        // Xử lý các lỗi tại đây
        console.error("Có lỗi xảy ra:", action);
        if (action.payload) {
            let _err = new ApiError(action.payload);
            console.log(_err.toString());
            store.dispatch(expriedToken() as any);
            return;
        }
        return;
    }

    return next(action);
};

export const store = configureStore({
    reducer: combineReducers({
        authState: authReducer,
        counter: counterReducer,
        productState: productReducer
    }),
    middleware: (getDefaultMiddle) => getDefaultMiddle({ serializableCheck: false }).concat(errorMiddleware),

});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<AppState, void, Action>;
