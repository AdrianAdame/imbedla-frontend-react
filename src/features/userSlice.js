import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    userId: null,
    token: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setCredentials: (state, action) => {
            const { user, userId, accessToken } = action.payload;

            state.user = user;
            state.userId = userId;
            state.token = accessToken;
        },
        setLogout: (state) => {
            state.user = null;
            state.userId = null;
            state.token = null;
        },
        //Add more user related reducers
    },
});

export const { setMode, setCredentials, setLogout } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
export const selecteCurrentUserId = (state) => state.user.userId;
export const selectCurrentToken = (state) => state.user.token;
export const selectCurrentThemeMode = (state) => state.user.mode;
