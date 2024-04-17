import { Box, Flex } from "@chakra-ui/react"
import ChatHeader from "./ChatHeader"
import ChatMessagesContainer from "./ChatMessagesContainer"
import MessageInput from "./MessageInput"

const ChatContainer = () => {
    return (
        <Flex flexDir={"column"} height={"full"}>
            <ChatHeader />
            <Box flex={1} overflow={"auto"}>
                <ChatMessagesContainer />
            </Box>
            <MessageInput />
        </Flex>
    )
}

export default ChatContainer