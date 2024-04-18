import { api } from "../api"
const CONVERSATIONS_URL = "/api/conversations"

export const conversationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createConversation: builder.mutation({
            query: ({ receiverId, senderId }) => ({
                url: `${CONVERSATIONS_URL}/create`,
                method: "POST",
                body: { receiverId, senderId }
            }),
            invalidatesTags: ["Conversations"]
        }),
        getUserConversations: builder.query({
            query: ({ userId }) => ({
                url: `${CONVERSATIONS_URL}/user/${userId}`,
                method: "GET"
            }),
            providesTags: ["Conversations"]
        })
    })
})

export const { useCreateConversationMutation, useGetUserConversationsQuery } = conversationsApi