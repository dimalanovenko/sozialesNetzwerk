import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {initialState as authInitialState} from "./authSlice.js";

// async request
export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async () => {
        const response = await axios.get('http://49.13.31.246:9191/me',
            {
                headers: {
                    "x-access-token": authInitialState.token
                }
            }
        );
        console.log(response.data);
        return response.data;
    })

export const changeProfile = createAsyncThunk(
    'profile/changeProfile',
    async ({username, avatar, age, bio, fullName, balance}) => {
        const response = await axios.put('http://49.13.31.246:9191/me',
            {
                "username": username,
                "avatar": avatar,
                "age": age,
                "bio": bio,
                "fullName": fullName,
                "balance": balance
            },
            {
                headers: {
                    "x-access-token": authInitialState.token
                }
            }
        );
        console.log(response.data);
        return response.data;
    })

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {
            _id: null,
            username: null,
            followers: null,
            following: null,
            avatar: "",
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                console.log(state.profile._id);
            })
            .addCase(changeProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                console.log(state.profile);
            })
    }
})

export const {} = profileSlice.actions;
export default profileSlice.reducer;