import { Box, Flex } from "@chakra-ui/react"
import Message from "./Message"

const ChatMessagesContainer = () => {
    return (
        <Box p={3}>
            <Flex flexDir={"column"}>
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </Flex>
        </Box>
    )
}

export default ChatMessagesContainer