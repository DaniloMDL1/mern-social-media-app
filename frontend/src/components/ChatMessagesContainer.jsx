import { Box, Flex, Spinner, Text } from "@chakra-ui/react"
import Message from "./Message"
import { useGetConversationMessagesQuery } from "../redux/messages/messagesApi"
import { useSelector } from "react-redux"

const ChatMessagesContainer = () => {
    const { conversation } = useSelector((state) => state.conversations)

    const { data: messages, isLoading: isMessagesLoading } = useGetConversationMessagesQuery({ conversationId: conversation?._id }, { skip: !conversation?._id })

    return (
        <Box p={3}>
            <Flex flexDir={"column"}>
                {isMessagesLoading && (
                    <Flex justifyContent={"center"}>
                        <Spinner size={"lg"}/>
                    </Flex>
                )} 
                {!isMessagesLoading && messages?.length === 0 && (
                    <Flex justifyContent={"center"} mt={5}>
                        <Text fontSize={{ sm: "md", md: "lg"}}>
                            Send a message to start a conversation.
                        </Text>
                    </Flex>
                )}
                {messages && messages.map((message) => (
                    <Message key={message._id} message={message}/>
                ))}
            </Flex>
        </Box>
    )
}

export default ChatMessagesContainer