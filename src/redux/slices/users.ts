import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AppState } from "../store";
import ApiError from "../../models/ApiError";
import User from "../../models/User";
import Endpoint from "../../services/api/end_point";
import { apiLoadUsersBySize } from "../../services/api/service";
import * as LocalStorage from '../../utils/storage';
import { AppState } from "../store";
interface ILoadUsersBySize {
    data: Array<any>
}
export interface UserListState {
    users: Array<User>,
    loading: boolean,
    error: ApiError,
    size: number
}

const initialState: UserListState = {
    users: [],
    loading: false,
    error: new ApiError(),
    size: 0
};




export const requestLoadUserBySize = createAsyncThunk(Endpoint.LOGIN, async (props: { size: number }, thunkApi) => {
    const { size } = props;
    const res = await apiLoadUsersBySize({ size });
    return { data: res };
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


const usersReducer = createSlice({
    name: "usersReducer",
    initialState,
    reducers: {
        restoreUserSession: {
            reducer: (state, action: PayloadAction<User[]>) => {
                state.users = action.payload
            },
            prepare: (user: User[]) => {
                return { payload: user }
            }
        },

    },
    extraReducers: (builder) => {
        const actionList = [requestLoadUserBySize];
        actionList.forEach(action => {
            builder.addCase(action.pending, (state) => {
                state.loading = true;
            })
        })

        builder.addCase(requestLoadUserBySize.fulfilled, (state, action: PayloadAction<ILoadUsersBySize>) => {
            console.log(`ha ha ha ?? ${action.payload.data}`);
            state.users = action.payload.data.map(e => {
                return new User(e);
            });
            state.loading = false;

        }).addCase(requestLoadUserBySize.rejected, (state, action) => {
            // state.error = new ApiError(action.payload);
            // state.loading = false;
        })


    }
});
export const { restoreUserSession } = usersReducer.actions
export const usersState = (state: AppState) => state.usersState as UserListState;
export default usersReducer.reducer;