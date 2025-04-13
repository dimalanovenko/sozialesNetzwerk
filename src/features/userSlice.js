import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { initialState as authInitialState } from "./authSlice.js";

export const initialState = {
    usersArr: [],
    user: {},
    isLoading: false,
    isError: false,
    error: null,
};

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://49.13.31.246:9191/users', {
                headers: {
                    "x-access-token": authInitialState.token
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error fetching users");
        }
    }
);

export const getUser = createAsyncThunk(
    'users/getUser',
    async (username, thunkAPI) => {
        try {
            const response = await axios.get(`http://49.13.31.246:9191/user/${username}`, {
                headers: {
                    "x-access-token": authInitialState.token
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error fetching user");
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.usersArr = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
