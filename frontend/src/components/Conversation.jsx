import { Avatar, Flex, Text } from "@chakra-ui/react"

const Conversation = () => {
    return (
        <Flex alignItems={"center"} gap={3} p={3} width={"full"}>
            <Avatar size={"md"}/>
            <Text fontSize={"sm"} width={"140px"} isTruncated>
                yangyang12
            </Text>
        </Flex>
    )
}

export default Conversation