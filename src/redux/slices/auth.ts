import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
// import { AppState } from "../store";
import { apiLogin } from "../../services/api/service";
import { AppState } from "../store";
import ApiError from "../../models/ApiError";
import User from "../../models/User";
import Config from "../../config";
import Endpoint from "../../services/api/end_point";

export interface UserState {
    user: User | null,
    loading: boolean,
    error: ApiError,
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: new ApiError(),
};
export const requestLogin = createAsyncThunk(Endpoint.LOGIN, async (props: { account: string, password: string }, thunkApi) => {
    const { account, password } = props;
    const res = await apiLogin({ account, password });
    if (res['message'] !== undefined) {
        return thunkApi.rejectWithValue(res);
    } else {
        return res;
    }
})

// export const requestChangePass = createAsyncThunk('auth/requestChangePass', async (props: {
//     _id: string,
//     passwordOld: string,
//     passwordNew: string,
//     isAdmin?: boolean
// }) => {
//     const res = await apiChangePass(props);
//     return res.data
// })


const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        const actionList = [requestLogin];
        actionList.forEach(action => {
            builder.addCase(action.pending, (state) => {
                state.loading = true;
            })
        })

        /**
            * login
            */
        builder.addCase(requestLogin.fulfilled, (state, action: PayloadAction<User>) => {
            console.log(`ha ha ha ${action.payload} ---- ${action.type}`);
            state.user = action.payload;
            state.loading = false;

        }).addCase(requestLogin.rejected, (state, action) => {
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

export const authState = (state: AppState) => state.authState as UserState;
export default authReducer.reducer;