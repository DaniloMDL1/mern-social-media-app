import { Box, Flex, Text, useColorMode } from "@chakra-ui/react"
import ChatSidebar from "../components/ChatSidebar"
import ChatContainer from "../components/ChatContainer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setSelectedConversation } from "../redux/conversations/conversationsSlice"

const ChatPage = () => {
    const { selectedConversation } = useSelector((state) => state.conversations)

    const dispatch = useDispatch()

    const { colorMode, toggleColorMode } = useColorMode()

    useEffect(() => {

        return () => {
            dispatch(setSelectedConversation(null))
        }
    }, [dispatch, setSelectedConversation])

    return (
        <>
            <Flex height={"100vh"} display={{ base: "none", md: "flex"}}>
                <Box flex={0.25} borderRight={"1px solid"} borderColor={colorMode === "light" ? "#d4d4d4" : "#78716c"}>
                    <ChatSidebar />
                </Box>
                <Box flex={1}>
                    {selectedConversation ? (
                        <ChatContainer />
                    ) : (
                        <Flex justifyContent={"center"} alignItems={"center"} height={"full"}>
                            <Text fontSize={"xl"}>
                                Select a conversation to start messaging.
                            </Text>
                        </Flex>
                    )}
                </Box>
            </Flex>
            <Box display={{ base: "block", md: "none"}} height={"100vh"}>
                {!selectedConversation ? (
                    <ChatSidebar />
                ) : (
                    <ChatContainer />
                )}
            </Box>
        </>
    )
}

export default ChatPage