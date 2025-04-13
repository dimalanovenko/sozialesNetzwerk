import axios from "axios";
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {initialState as authInitialState} from "./authSlice.js";

export const initialState = {
    posts: [],
    filteredPosts: [],
    myPosts: [],
    filteredMyPosts: [],
    status: null,
    error: null,
    isLoading: false,
}

export const getPosts = createAsyncThunk(
    'feed/getPosts',
    async () => {
        const response = await axios.get('http://49.13.31.246:9191/posts',
            {
                headers: {
                    "x-access-token": authInitialState.token
                }
            }
        );
        return response.data;
    })

export const getMyPosts = createAsyncThunk(
    'feed/getMyPosts',
    async (userId) => {
        const response = await axios.get('http://49.13.31.246:9191/posts', {
            params: {user_id: userId},
            headers: {
                "x-access-token": authInitialState.token
            }
        });
        return response.data;
    }
);

export const deletePost = createAsyncThunk(
    'feed/deletePost',
    async (postId) => {
        try {
            const response = await axios.delete(
                `http://49.13.31.246:9191/post/${postId}`,
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

const isValidMedia = (url) => {
    if (!url || typeof url !== 'string' || !url.trim()) return false;

    try {
        new URL(url);
    } catch {
        return false;
    }

    const imageExtensions = /\.(jpeg|jpg|png|gif|webp|svg|bmp)$/i;

    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv|3gp)$/i;

    const youtubePattern = /(youtube\.com|youtu\.be)/i;

    return imageExtensions.test(url) ||
        videoExtensions.test(url) ||
        youtubePattern.test(url);
};

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.filteredPosts = action.payload
                    .reverse()
                    .filter((post) =>
                        (post.image && isValidMedia(post.image)) ||
                        (post.video && isValidMedia(post.video))
                    );
                state.isLoading = false;
            })

            .addCase(getMyPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.myPosts = action.payload;
                console.log('my posts:', state.myPosts);
                state.filteredMyPosts = action.payload
                    .reverse()
                    .filter((post) =>
                        (post.image && isValidMedia(post.image)) ||
                        (post.video && isValidMedia(post.video))
                    );
                state.isLoading = false;
            })

            .addCase(deletePost.fulfilled, (state) => {
                state.status = 'succeeded';
            })
    }
})

export default feedSlice.reducer;