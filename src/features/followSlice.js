import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {initialState as authInitialState} from './authSlice.js';

const initialState = {
    status: 'idle',
    error: null,
};

export const follow = createAsyncThunk(
    'subscribe/follow',
    async (username) => {
        try {
            const response = await axios.post(
                `http://49.13.31.246:9191/follow`,
                {
                    username: username
                },
                {
                    headers: {
                        'x-access-token': authInitialState.token,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
);

export const unfollow = createAsyncThunk(
    'subscribe/unfollow',
    async (username) => {
        try {
            const response = await axios.post(
                `http://49.13.31.246:9191/unfollow`,
                {
                    username: username
                },
                {
                    headers: {
                        'x-access-token': authInitialState.token,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
);

const likeSlice = createSlice({
    name: 'subscribe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // follow
            .addCase(follow.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(follow.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(follow.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // unfollow
            .addCase(unfollow.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(unfollow.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(unfollow.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export default likeSlice.reducer;
