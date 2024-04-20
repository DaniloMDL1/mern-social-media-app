import { Box, Flex, Spinner, Text } from "@chakra-ui/react"
import Message from "./Message"
import { useGetConversationMessagesQuery } from "../redux/messages/messagesApi"
import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"

const ChatMessagesContainer = () => {
    const { conversation } = useSelector((state) => state.conversations)
    const { socket } = useSelector((state) => state.socket)

    const scrollRef = useRef(null)

    const { data: messages, isLoading: isMessagesLoading, refetch } = useGetConversationMessagesQuery({ conversationId: conversation?._id }, { skip: !conversation?._id })

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        socket?.on("sendMessage", (message) => {
            refetch()
        })

        socket?.on("deleteMessage", (messageId) => {
            refetch()
        })

        return () => {
            socket?.off("sendMessage")
            socket?.off("deleteMessage")  
        } 
    }, [socket])

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
                <Box ref={scrollRef}/>
            </Flex>
        </Box>
    )
}

export default ChatMessagesContainer