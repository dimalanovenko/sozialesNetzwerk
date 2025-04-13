import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {initialState as authInitialState} from "./authSlice.js";

export const initialState = {isLoading: false, error: null}

export const createPost = createAsyncThunk(
    'createPost/createPost',
    async ({title, description, status, image, video}) => {
        const response = await axios.post('http://49.13.31.246:9191/post',
            {
                "title": title,
                "description": description,
                "status": status,
                "image": image,
                "video": video
            },
            {
                headers: {
                    "x-access-token": authInitialState.token
                }
            }
        );
        return response.data;
    })

const createPostSlice = createSlice({
    name: 'createPost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            });
    }
})

export default createPostSlice.reducer;