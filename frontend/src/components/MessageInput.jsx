import { Avatar, Box, Flex, IconButton, Input, InputGroup, InputRightElement, useColorMode } from "@chakra-ui/react"
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../redux/messages/messagesApi";
import useShowToast from "../hooks/useShowToast";

const MessageInput = () => {
    const { user } = useSelector((state) => state.user)
    const { selectedConversation, conversation } = useSelector((state) => state.conversations)

    const [message, setMessage] = useState("")

    const { colorMode, toggleColorMode } = useColorMode()

    const showToast = useShowToast()

    const [ sendMessageApi, { isLoading: isSendMessageLoading } ] = useSendMessageMutation()

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if(isSendMessageLoading) return
        try {
            const res = await sendMessageApi({ conversationId: conversation?._id, message, senderId: user._id, receiverId: selectedConversation }).unwrap()

            setMessage("")
            
        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    return (
        <Box p={3} borderTop={"1px solid"} borderColor={colorMode === "light" ? "#d4d4d4" : "#78716c"}>
            <Flex onSubmit={handleSendMessage} as={"form"} alignItems={"center"} justifyContent={"center"} gap={3}>
                <Avatar src={user.profilePicture} size={"sm"}/>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Type something..." width={"360px"} size={"sm"} borderRadius={"6px"}/>
                <IconButton type="submit" background={"none"} _hover={{ backgroundColor: "none"}} _active={{ backgroundColor: "none"}}>
                    <IoMdSend size={22}/>
                </IconButton>
            </Flex>
        </Box>
    )
}

export default MessageInput