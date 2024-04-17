import { Box, Flex, useColorMode } from "@chakra-ui/react"
import ChatSidebar from "../components/ChatSidebar"
import ChatContainer from "../components/ChatContainer"

const ChatPage = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <>
            <Flex height={"100vh"}>
                <Box flex={0.25} borderRight={"1px solid"} borderColor={colorMode === "light" ? "#d4d4d4" : "#78716c"}>
                    <ChatSidebar />
                </Box>
                <Box flex={1}>
                    <ChatContainer />
                </Box>
            </Flex>
        </>
    )
}

export default ChatPage