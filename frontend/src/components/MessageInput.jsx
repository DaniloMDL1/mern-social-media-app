import { Avatar, Box, Flex, IconButton, Input, InputGroup, InputRightElement, useColorMode } from "@chakra-ui/react"
import { IoMdSend } from "react-icons/io";

const MessageInput = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box p={3} borderTop={"1px solid"} borderColor={colorMode === "light" ? "#d4d4d4" : "#78716c"}>
            <Flex alignItems={"center"} justifyContent={"center"} gap={3}>
                <Avatar size={"sm"}/>
                <Input type="text" placeholder="Type something..." width={"360px"}/>
                <IconButton background={"none"} _hover={{ backgroundColor: "none"}} _active={{ backgroundColor: "none"}}>
                    <IoMdSend size={22}/>
                </IconButton>
            </Flex>
        </Box>
    )
}

export default MessageInput