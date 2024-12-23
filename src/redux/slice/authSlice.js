import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: null,
    email: null,
    userId: null,
    isAdmin: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            const { email, userId} = action.payload;
            state.isLoggedIn = true;
            state.email = email;
            state.userId = userId;

            if (email === "asterafarmsph@gmail.com" || email === "asterafarmshop@gmail.com") {
                state.isAdmin = true
            } else {
                state.isAdmin = false
            }
        },
        REMOVE_ACTIVE_USER: (state) => {
            state.isLoggedIn = false;
            state.email = null;
            state.userId = null;
            state.isAdmin = false;
        },
    },
})

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserID = (state) => state.auth.userId;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export default authSlice.reducer;