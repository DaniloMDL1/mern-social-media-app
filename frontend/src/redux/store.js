import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import conversationsReducer from "./conversations/conversationsSlice"
import socketReducer from "./socket/socketSlice"
import { api } from "./api"

const store = configureStore({
    reducer: {
        user: userReducer,
        [api.reducerPath]: api.reducer,
        conversations: conversationsReducer,
        socket: socketReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(api.middleware),
    devTools: true
})

export default store