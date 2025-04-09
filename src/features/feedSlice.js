import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {initialState as authInitialState} from "./authSlice.js";

export const initialState = {
    posts: [],
    filteredPosts: [],
    myPosts: [],
    filteredMyPosts: [],
    status: '',
    error: null,
}

// async request
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

// async request
export const getMyPosts = createAsyncThunk(
    'feed/getMyPosts',
    async (userId) => {
        const response = await axios.get('http://49.13.31.246:9191/posts', {
            params: { user_id: userId },
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
    if (typeof url !== 'string' || !url.trim()) return false;

    const isValidUrl = /^(https?:\/\/)/i.test(url);

    // Проверка для изображений
    const imageExtensions = /\.(jpeg|jpg|png|gif|webp|svg)$/i;

    // Проверка для видео
    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i;

    // Проверка на YouTube-видео
    const isYoutubeUrl = /(youtube\.com|youtu\.be)/i.test(url);

    return isValidUrl && (imageExtensions.test(url) || videoExtensions.test(url) || isYoutubeUrl);
};

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.filteredPosts = action.payload
                    .reverse()
                    .filter((post) =>
                        post.image && isValidMedia(post.image || post.video)
                    );

                console.log('Отфильтрованные посты:', state.filteredPosts);
            })
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.myPosts = action.payload;
                state.filteredMyPosts = action.payload
                    .reverse()
                    .filter((post) =>
                        post.image && isValidMedia(post.image)
                    );

                console.log('filtered my posts:', state.filteredMyPosts);
            })
            .addCase(deletePost.fulfilled, (state) => {
                state.status = 'succeeded';
            })
    }
})

export default feedSlice.reducer;