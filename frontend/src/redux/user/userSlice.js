import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: localStorage.getItem("user-info") ? JSON.parse(localStorage.getItem("user-info")) : null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signUp: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user-info", JSON.stringify(action.payload))
        },
        signIn: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user-info", JSON.stringify(action.payload))
        },
        signOut: (state) => {
            state.user = null
            localStorage.removeItem("user-info")
        },
        updateProfile: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user-info", JSON.stringify(action.payload))
        }
    }
})

export const { signUp, signIn, signOut, updateProfile } = userSlice.actions

export default userSlice.reducer