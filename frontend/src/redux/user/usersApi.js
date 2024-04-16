import { api } from "../api"
const USERS_URL = "/api/users"

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: ({ query }) => ({
                url: `${USERS_URL}/profile/${query}`,
                method: "GET"
            }),
            providesTags: ["Users"]
        }),
        updateProfile: builder.mutation({
            query: ({ userId, ...data }) => ({
                url: `${USERS_URL}/profile/update/${userId}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Users"]
        }),
        followUnfollowUser: builder.mutation({
            query: ({ userId }) => ({
                url: `${USERS_URL}/follow/${userId}`,
                method: "PUT"
            }),
            invalidatesTags: ["Users"]
        }),
        getSuggestedUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}/suggested`,
                method: "GET"
            }),
            providesTags: ["Users"]
        }),
        getUserFollowers: builder.query({
            query: ({ userId }) => ({
                url: `${USERS_URL}/followers/${userId}`,
                method: "GET"
            }),
            providesTags: ["Users"]
        }),
        getUserFollowings: builder.query({
            query: ({ userId }) => ({
                url: `${USERS_URL}/following/${userId}`,
                method: "GET"
            }),
            providesTags: ["Users"]
        }),
        searchForUsers: builder.query({
            query: ({ searchTerm }) => ({
                url: `${USERS_URL}/search`,
                method: "GET",
                params: { searchTerm }
            }),
            providesTags: ["Users"]
        }),
    })
})

export const { useGetUserProfileQuery, useUpdateProfileMutation, useFollowUnfollowUserMutation, useGetSuggestedUsersQuery, useGetUserFollowersQuery, useGetUserFollowingsQuery, useSearchForUsersQuery } = usersApi