import { api } from "../api"
const MESSAGES_URL = "/api/messages"

export const messagesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (data) => ({
                url: `${MESSAGES_URL}/send`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Messages"]
        }),
        getConversationMessages: builder.query({
            query: ({ conversationId }) => ({
                url: `${MESSAGES_URL}/conversation/${conversationId}`,
                method: "GET"
            }),
            providesTags: ["Messages"]
        }),
        deleteMessage: builder.mutation({
            query: ({ messageId }) => ({
                url: `${MESSAGES_URL}/delete/${messageId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Messages"]
        })
    })
})

export const { useSendMessageMutation, useGetConversationMessagesQuery, useDeleteMessageMutation } = messagesApi