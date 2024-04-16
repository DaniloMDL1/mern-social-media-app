import { api } from "../api"
const POSTS_URL = "/api/posts"

export const postsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (data) => ({
                url: `${POSTS_URL}/create`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Posts"]
        }),
        getUserPosts: builder.query({
            query: ({ username }) => ({
                url: `${POSTS_URL}/user/${username}`,
                method: "GET"
            }),
            providesTags: ["Posts"]
        }),
        getFeedPosts: builder.query({
            query: () => ({
                url: `${POSTS_URL}/feed`,
                method: "GET"
            }),
            providesTags: ["Posts", "Users"]
        }),
        likeUnlikePost: builder.mutation({
            query: ({ postId }) => ({
                url: `${POSTS_URL}/like/${postId}`,
                method: "PUT"
            }),
            invalidatesTags: ["Posts"]
        }),
        deletePost: builder.mutation({
            query: ({ postId }) => ({
                url: `${POSTS_URL}/delete/${postId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Posts"]
        })
    })
})

export const { useCreatePostMutation, useGetUserPostsQuery, useGetFeedPostsQuery, useLikeUnlikePostMutation, useDeletePostMutation } = postsApi