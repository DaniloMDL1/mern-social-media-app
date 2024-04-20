import { Avatar, AvatarBadge, Flex, Text, useColorMode } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useGetUserProfileQuery } from "../redux/user/usersApi"
import { setConversation, setSelectedConversation } from "../redux/conversations/conversationsSlice"

const Conversation = ({ conversation }) => {
    const { user } = useSelector((state) => state.user)
    const { selectedConversation } = useSelector((state) => state.conversations)
    const { onlineUsers } = useSelector((state) => state.socket)

    const dispatch = useDispatch()

    const { colorMode, toggleColorMode } = useColorMode()

    const otherUserId = conversation.participants.find((id) => id !== user._id)

    const isOnline = onlineUsers.includes(otherUserId)

    const { data: conversationUserData } = useGetUserProfileQuery({ query: otherUserId })

    if(!conversationUserData) return null

    return (
        <Flex onClick={() => {
            dispatch(setSelectedConversation(otherUserId))
            dispatch(setConversation(conversation))
        }} alignItems={"center"} gap={3} p={3} width={"full"} backgroundColor={selectedConversation === otherUserId ? (colorMode === "dark" ? "#262626" : "#f3f4f6") : ""} cursor={"pointer"}>
            <Avatar src={conversationUserData.profilePicture} size={"md"}>
                {isOnline && (<AvatarBadge boxSize={"1.1em"} bg={"green.500"}/>)}
            </Avatar>
            <Text fontSize={"sm"} width={"140px"} isTruncated>
                {conversationUserData.fullName}
            </Text>
        </Flex>
    )
}

export default Conversation