import Post from "../components/Post"
import UserProfileHeader from "../components/UserProfileHeader"
import { useParams } from "react-router-dom"
import { useGetUserProfileQuery } from "../redux/user/usersApi"
import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useGetUserPostsQuery } from "../redux/posts/postsApi"

const UserProfilePage = () => {
    const { username } = useParams()

    const { data: userData, isLoading: isUserDataLoading } = useGetUserProfileQuery({ query: username })

    const { data: userPostsData, isLoading: isUserPostsLoading } = useGetUserPostsQuery({ username })
    
    if(!userData && !isUserDataLoading) {
        return (
            <Flex justifyContent={"center"}>
                <Text fontSize={"2xl"}>User not found.</Text>
            </Flex>
        )
    }

    if(isUserDataLoading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"lg"}/>
            </Flex>
        )
    }

    return (
        <>
            <UserProfileHeader userData={userData}/>
            {isUserPostsLoading && (
                <Flex justifyContent={"center"} mt={5}>
                    <Spinner size={"lg"}/>
                </Flex>
            )}

            {!isUserDataLoading && userPostsData?.length === 0 && (
                <Flex justifyContent={"center"} mt={5}>
                    <Text fontSize={"2xl"}>
                        No posts for now.
                    </Text>
                </Flex>
            )}

            {userPostsData && userPostsData.map((post) => (
                <Post key={post._id} post={post}/>
            ))}
        </>
    )
}

export default UserProfilePage