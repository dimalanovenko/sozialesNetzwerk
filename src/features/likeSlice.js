import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {initialState as authInitialState} from './authSlice.js';

const initialState = {
    status: 'idle',
    error: null,
};

export const postLike = createAsyncThunk(
    'like/postLike',
    async (postId) => {
        try {
            const response = await axios.post(
                `http://49.13.31.246:9191/like`,
                {
                    "post_id": postId,
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

export const deleteLike = createAsyncThunk(
    'like/deleteLike',
    async (postId) => {
        try {
            const response = await axios.delete(
                `http://49.13.31.246:9191/like/${postId}`,
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
    name: 'like',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // post
            .addCase(postLike.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postLike.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(postLike.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // delete
            .addCase(deleteLike.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteLike.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(deleteLike.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export const {setIsLiked} = likeSlice.actions;
export default likeSlice.reducer;
