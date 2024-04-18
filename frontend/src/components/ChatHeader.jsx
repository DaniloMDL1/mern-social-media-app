import { Avatar, Box, Flex, Text, useColorMode } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useGetUserProfileQuery } from "../redux/user/usersApi"
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { setConversation, setSelectedConversation } from "../redux/conversations/conversationsSlice"

const ChatHeader = () => {
    const { selectedConversation } = useSelector((state) => state.conversations)

    const dispatch = useDispatch()

    const { colorMode, toggleColorMode } = useColorMode()

    const { data: conversationUserData } = useGetUserProfileQuery({ query: selectedConversation }, { skip: !selectedConversation })

    if(!conversationUserData) return null

    return (
        <Box borderBottom={"1px solid"} borderColor={colorMode === "light" ? "#d4d4d4" : "#78716c"} width={"full"}>
            <Flex alignItems={"center"} gap={3} py={3} px={4}>
                <Box onClick={() => {
                    dispatch(setSelectedConversation(null))
                    dispatch(setConversation(null))
                }} display={{ md: "none"}}>
                    <MdOutlineArrowBackIosNew size={22}/>
                </Box>
                <Avatar src={conversationUserData.profilePicture} size={"md"}/>
                <Text>
                    {conversationUserData.username}
                </Text>
            </Flex>
        </Box>
    )
}

export default ChatHeader