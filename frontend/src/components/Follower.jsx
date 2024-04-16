import { Avatar, Box, Flex, Text, useColorMode } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const Follower = ({ follower, onClose }) => {
    const navigate = useNavigate()

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box onClick={() => {
            navigate(`/profile/${follower.username}`)
            onClose()
        }}>
            <Flex alignItems={"center"} _hover={{ backgroundColor: colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}} cursor={"pointer"} gap={3} p={2}>
                <Avatar src={follower.profilePicture} size={"sm"}/>
                <Text fontSize={"md"} isTruncated width={"200px"}>{follower.username}</Text>
            </Flex>
        </Box>
    )
}

export default Follower