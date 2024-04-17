import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react"
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SearchUsersInput from "./SearchUsersInput"
import Conversation from "./Conversation"

const ChatSidebar = () => {
    const { user } = useSelector((state) => state.user)

    return (
        <VStack alignItems={"flex-start"} height={"full"}>
            <Flex alignItems={"center"} gap={3} p={2}>
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
            <Box p={2}>
                <SearchUsersInput />
            </Box>
            <VStack overflow={"auto"} flex={1} width={"full"}>
                <Conversation />
                <Conversation />
            </VStack>
        </VStack>
    )
}

export default ChatSidebar