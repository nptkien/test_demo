import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
// import { AppState } from "../store";
import { apiLoadProductsByCategoryId, apiLogin } from "../../services/api/service";
import { AppState } from "../store";
import ApiError from "../../models/ApiError";
import User from "../../models/User";
import Config from "../../config";
import Endpoint from "../../services/api/end_point";
import * as LocalStorage from '../../utils/storage';
import Product from "../../models/Product";
interface ILoadProductByCateId {
    data: Array<any>
}
export interface ProductState {
    products: Array<Product>,
    loading: boolean,
    error: ApiError,
    currentPage: number
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: new ApiError(),
    currentPage: -1
};

const saveUserToStorage = async (user: User) => {
    try {
        // Chuyển đổi đối tượng User thành chuỗi JSON
        const jsonUser = JSON.stringify(user);

        // Lưu chuỗi JSON vào Local Storage
        await LocalStorage.save('user', jsonUser);
        console.log('Đã lưu instance của User vào Local Storage.');
    } catch (error) {
        console.error('Lỗi khi lưu instance của User vào Local Storage:', error);
    }
};

export const requestLoadProductsByCategoryId = createAsyncThunk(Endpoint.LOGIN, async (props: { categoryId: string, page: number }, thunkApi) => {
    const { categoryId, page } = props;
    const res = await apiLoadProductsByCategoryId({ categoryId, page });
    if (res['message'] !== undefined) {
        // return thunkApi.rejectWithValue(res);
    } else {
        // saveUserToStorage(res)
        // if (res.data.token) {
        //     // LocalStorage.save("token", res.data.token);
        // }
        // console.log(`ressssss ${res.data.token}`)
        return res;
    }
})



const productsReducer = createSlice({
    name: "productsRed",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        const actionList = [requestLoadProductsByCategoryId];
        actionList.forEach(action => {
            builder.addCase(action.pending, (state) => {
                state.loading = true;
            })
        })

        /**
            * login
            */
        builder.addCase(requestLoadProductsByCategoryId.fulfilled, (state, action: PayloadAction<ILoadProductByCateId>) => {
            console.log(`ha ha ha ${action.payload} `);
            state.products = action.payload.data.map(e => {
                return new Product(e);
            });
            state.currentPage += 1;
            console.log("vaix dai ", state.products);

            state.loading = false;

        }).addCase(requestLoadProductsByCategoryId.rejected, (state, action) => {
            state.error = new ApiError(action.payload);
            state.loading = false;
        })

        /**
         * change password
         */
        // builder.addCase(requestChangePass.pending, (state) => {
        //     state.loading = true;
        // })
        // builder.addCase(requestChangePass.fulfilled, (state, action: PayloadAction<{
        //     status: number,
        //     data: null | string
        // }>) => {
        //     state.loading = false;
        // })


    }
});
export const { } = productsReducer.actions
export const productState = (state: AppState) => state.productState as ProductState;
export default productsReducer.reducer;