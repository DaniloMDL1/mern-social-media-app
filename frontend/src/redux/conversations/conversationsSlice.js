import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedConversation: null,
    conversation: null
}

export const conversationsSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        },
        setConversation: (state, action) => {
            state.conversation = action.payload
        }
    }
})

export const { setSelectedConversation, setConversation } = conversationsSlice.actions

export default conversationsSlice.reducer