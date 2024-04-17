import { Avatar, Flex, Text, useColorMode } from "@chakra-ui/react"

const Message = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <>
            <Flex alignItems={"center"} flexDir={"row-reverse"} gap={3} my={5}>
                <Text fontSize={"sm"} flex={0.069}>
                    5 hours ago
                </Text>
                <Text flex={1} fontSize={"sm"} backgroundColor={"#1e40af"} color={"white"} p={3} borderRadius={"9999px"} maxW={"max-content"}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, harum? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </Text>
            </Flex>

            <Flex alignItems={"center"}>
                <Flex gap={3} alignItems={"center"} flex={0.9}>
                    <Avatar size={"md"}/>
                    <Text backgroundColor={colorMode === "light" ? "#e5e7eb" : "#292524"} color={colorMode === "light" ? "black" : "white"} p={3} fontSize={"sm"} borderRadius={"9999px"}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, iure! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, consequatur.
                    </Text>
                </Flex>
                <Text fontSize={"sm"} textAlign={"right"} flex={0.1}>
                    5 hours ago
                </Text>
            </Flex>
        </>
    )
}

export default Message