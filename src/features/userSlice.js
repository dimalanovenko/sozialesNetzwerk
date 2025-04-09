import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {initialState as authInitialState} from "./authSlice.js";

export const initialState = {
    usersArr: [],
    user: {},
    status: '',
    error: null,
}

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
        const response = await axios.get('http://49.13.31.246:9191/users',
            {
                headers: {
                    "x-access-token": authInitialState.token
                }
            }
        );
        return response.data;
    })

export const getUser = createAsyncThunk(
    'users/getUser',
    async (username) => {
        const response = await axios.get(`http://49.13.31.246:9191/user/${username}`,
            {
                headers: {
                    "x-access-token": authInitialState.token
                }
            }
        );
        return response.data;
    })

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.usersArr = action.payload;

                console.log('users:', state.usersArr);
            })

            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;

                console.log('user:', state.user);
            })
    }
})

// export const {} = feedSlice.actions;
export default userSlice.reducer;