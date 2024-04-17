import { Avatar, Box, Flex, Text, useColorMode } from "@chakra-ui/react"

const ChatHeader = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box borderBottom={"1px solid"} borderColor={colorMode === "light" ? "#d4d4d4" : "#78716c"} width={"full"}>
            <Flex alignItems={"center"} gap={3} py={3} px={4}>
                <Avatar size={"md"}/>
                <Text>
                    yangyang12
                </Text>
            </Flex>
        </Box>
    )
}

export default ChatHeader