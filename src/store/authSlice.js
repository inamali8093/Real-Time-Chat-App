import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginState: (state,action)=>{
            state.status = true;
            state.userData = action.payload.userData
        },
        logoutState: (state,action)=>{
            state.status = false;
            state.userData = null
        }
    }
})

export const {loginState,logoutState} = authSlice.actions

export default authSlice.reducer