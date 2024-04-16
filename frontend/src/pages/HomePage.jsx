import { Flex, Spinner, Text, Box, VStack } from "@chakra-ui/react"
import { useGetFeedPostsQuery } from "../redux/posts/postsApi"
import Post from "../components/Post"
import { useGetSuggestedUsersQuery } from "../redux/user/usersApi"
import SuggestedUser from "../components/SuggestedUser"

const HomePage = () => {

    const { data: feedPostsData, isLoading } = useGetFeedPostsQuery()

    const { data: suggestedUsersData, isLoading: isSuggestedUsersDataLoading } = useGetSuggestedUsersQuery()

    return (
        <Flex width={"100%"} flexDir={{ base: "column", md: "row"}} pb={5}>
            <Box flex={0.3} />
            <Box flex={0.4}>
                {isLoading && (
                    <Flex justifyContent={"center"} mt={5}>
                        <Spinner size={"lg"}/>
                    </Flex>
                )}
                {!isLoading && feedPostsData?.length === 0 && (
                    <Flex justifyContent={"center"} mt={5}>
                        <Text fontSize={{ sm: "md", md: "xl"}}>
                            You must follow someone to see their posts.
                        </Text>
                    </Flex>
                )}
                {feedPostsData && feedPostsData.map((post) => (
                    <Post key={post._id} post={post}/>
                ))}
            </Box>
            <Box flex={0.3} justifyContent={"center"} display={"flex"} mt={5}>
                <Box width={"240px"}>
                    {isSuggestedUsersDataLoading && (
                        <Flex justifyContent={"center"} mt={5}>
                            <Spinner size={"lg"}/>
                        </Flex>
                    )}
                    {!isSuggestedUsersDataLoading && suggestedUsersData?.length === 0 && (
                        <Flex justifyContent={"center"} mt={5}>
                            <Text>
                                No suggested users for now.
                            </Text>
                        </Flex>
                    )}
                    {suggestedUsersData?.length > 0 && (
                        <>
                            <Text fontSize={"md"} mb={2} fontWeight={600}>Suggested Users</Text>
                            <VStack width={"full"} gap={2}>
                                {suggestedUsersData.map((user) => (
                                    <SuggestedUser key={user._id} userData={user}/>
                                ))}
                            </VStack>
                        </>
                    )}
                </Box>
            </Box>
        </Flex>
    )
}

export default HomePage