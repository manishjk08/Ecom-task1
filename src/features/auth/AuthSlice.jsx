import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {

        error: null,
        user: null

    },
    reducers: {
        loginRequest: (state) => {

            state.error = false;

        },
        loginSucess: (state, action) => {

            state.user = action.payload
        },
        loginFailure: (state, action) => {

            state.error = action.payload
        },
        logout: (state) => {

            state.user = null
        }
    }
})
export const { loginRequest, loginSucess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;