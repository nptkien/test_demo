import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AppState } from "../store";
import { apiLogin } from "../../services/api/service";
import { AppState } from "../store";

export interface UserState {
    user: User | null,
    loading: boolean,
    error: string,
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: '',
};
function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}
export const requestLogin = createAsyncThunk('auth/login', async (props: { account: string, password: string }) => {
    const { account, password } = props;
    await timeout(2000);
    // const res = await apiLogin(props);
    // return res.data
    return new User({ account, password })
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
        decrement: (state) => {
            state.loading = true;
        },
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
            state.loading = false;
            state.user = action.payload;
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