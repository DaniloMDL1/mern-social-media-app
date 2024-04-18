import { Avatar, Box, Flex, Spinner, Text, VStack } from "@chakra-ui/react"
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SearchUsersInput from "./SearchUsersInput"
import Conversation from "./Conversation"
import { useGetUserConversationsQuery } from "../redux/conversations/conversationsApi"

const ChatSidebar = () => {
    const { user } = useSelector((state) => state.user)

    const { data: conversations, isLoading: isConversationsLoading } = useGetUserConversationsQuery({ userId: user._id })

    return (
        <VStack alignItems={"flex-start"} height={"full"}>
            <Flex alignItems={"center"} gap={3} p={4}>
                <Link to={"/"}>
                    <MdOutlineArrowBackIosNew size={22} cursor={"pointer"}/>
                </Link>
                <Flex alignItems={"center"} gap={4}>
                    <Avatar src={user.profilePicture} size={"sm"}/>
                    <Text width={"120px"} isTruncated>
                        {user.username}
                    </Text>
                </Flex>
            </Flex>
            <Box p={2} width={"full"}>
                <SearchUsersInput />
            </Box>
            {isConversationsLoading && (
                <Flex alignSelf={"center"} mt={5}>
                    <Spinner size={"md"}/>
                </Flex>
            )}
            {!isConversationsLoading && conversations?.length === 0 && (
                <Flex alignSelf={"center"} mt={5}>
                    <Text fontSize={{ base: "sm", md: "lg"}}>
                        No conversations for now.
                    </Text>
                </Flex>
            )}
            {conversations && (
                <VStack overflow={"auto"} gap={0} flex={1} width={"full"}>
                    {conversations.map((conversation) => (
                        <Conversation key={conversation._id} conversation={conversation}/>
                    ))}
                </VStack>
            )}
        </VStack>
    )
}

export default ChatSidebar