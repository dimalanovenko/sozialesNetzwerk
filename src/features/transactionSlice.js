import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {initialState as authInitialState} from "./authSlice.js";

// async request
export const sendMoney = createAsyncThunk(
    'transaction/sendMoney',
    async ({amount, userName, userAvatar, trDate, trType}) => {
        const response = await axios.post('http://49.13.31.246:9191/transaction',
            {
                "amount": amount,
                "userName": userName,
                "userAvatar": userAvatar,
                "trDate": trDate,
                "trType": trType
                // topUp & out
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

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMoney.fulfilled, (state, action) => {
                state.status = action.payload;
            })
    }
})

export const {} = transactionSlice.actions;
export default transactionSlice.reducer;