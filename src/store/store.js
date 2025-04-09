import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import feedReducer from "../features/feedSlice";
import profileReducer  from "../features/profileSlice";
import likeReducer from "../features/likeSlice";
import createPostReducer from "../features/createPostSlice.js";
import usersReducer from "../features/userSlice.js";
import followReducer from "../features/followSlice";
import transactionReducer from "../features/followSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        feed: feedReducer,
        profile: profileReducer,
        like: likeReducer,
        createPost: createPostReducer,
        users: usersReducer,
        follow: followReducer,
        transaction: transactionReducer,
    },
});
