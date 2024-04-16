import { Box, Button, Flex, Link, Text, useColorMode, Container, Tooltip, IconButton } from "@chakra-ui/react"
import SearchUsersInput from "./SearchUsersInput"
import { CiLogout } from "react-icons/ci"
import { FaUser } from "react-icons/fa"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5"
import { FaSun, FaMoon } from "react-icons/fa6"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { AddIcon } from "@chakra-ui/icons"
import { useSelector, useDispatch } from "react-redux"
import { useSignoutMutation } from "../redux/user/authApi"
import { signOut } from "../redux/user/userSlice"

const Header = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { colorMode, toggleColorMode } = useColorMode()

    const [ signOutApi, { isLoading } ] = useSignoutMutation()

    const handleSignOut = async () => {
        try {
            const res = await signOutApi().unwrap()

            dispatch(signOut())
            
        } catch(error) {
            console.error(`Error: ${error.message}`)
        }
    }

    return (
        <>
            {user ? (
                <>
                    <Box pb={5}>
                        <Flex position={"fixed"} right={0} left={0} top={0} backgroundColor={colorMode === "light" ? "gray.50" : "#101010"} zIndex={102} p={4} display={{ base: "none", md: "flex"}} alignItems={"center"} borderBottom={"1px solid"} borderColor={colorMode === "light" ? "gray.200" : "gray.dark"}>
                            <Box flex={0.3}>
                                <Flex alignItems={"center"} gap={4}>
                                    <Link as={RouterLink} to={"/"} _hover={{ color: "blue.500"}}>
                                        <Text fontSize={"2xl"} fontWeight={"semibold"}>SocialMediaApp</Text>
                                    </Link>
                                </Flex>
                            </Box>
                            <Box flex={0.4} display={"flex"} justifyContent={"center"}>
                                <SearchUsersInput />
                            </Box>
                            <Box flex={0.3} display={"flex"} alignItems={"center"} gap={4} justifyContent={"flex-end"}>
                                <Tooltip label={"Chat"} hasArrow>
                                    <IconButton onClick={() => navigate("/chat")} background={colorMode === "light" ? "gray.50" : "#101010"} _hover={{ backgroundColor: "none"}} _active={{ backgroundColor: "none"}}>
                                        <IoChatbubbleEllipsesSharp size={28} cursor={"pointer"}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip label={"Create post"} hasArrow>
                                    <Link as={RouterLink} to={`/create-post`}>
                                        <Button size={"md"}>
                                            <AddIcon />
                                        </Button>
                                    </Link>
                                </Tooltip>
                                <Tooltip label={"Profile"} hasArrow>
                                    <Link as={RouterLink} to={`/profile/${user.username}`}>
                                        <Box p={2.5} _hover={{ bg: colorMode === "light" ? "gray.200" : "whiteAlpha.200" }} cursor={"pointer"} borderRadius={"full"}>
                                            <FaUser size={20}/>
                                        </Box>
                                    </Link>
                                </Tooltip>
                                <Tooltip label={"Sign Out"} hasArrow>
                                    <Button isLoading={isLoading} onClick={handleSignOut} size={"md"}>
                                        <CiLogout size={20}/>
                                    </Button>
                                </Tooltip>
                                <Button bg={"none"} onClick={toggleColorMode}>
                                    {colorMode === "light" ? (<FaMoon size={20}/>) : (<FaSun size={20}/>)}
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                    <Box pb={14}>
                        <Box display={{ base: "block", md: "none"}} position={"fixed"} right={0} left={0} top={0} p={4} backgroundColor={colorMode === "light" ? "gray.50" : "#101010"} zIndex={100}>
                            <Flex alignItems={"center"} justifyContent={"space-between"}>
                                <Link as={RouterLink} to={"/"} _hover={{ color: "blue.500"}}>
                                    <Text fontSize={"xl"} fontWeight={"semibold"}>SocialMediaApp</Text>
                                </Link>
                                <Tooltip label={"Chat"} hasArrow>
                                    <IconButton onClick={() => navigate("/chat")} background={colorMode === "light" ? "gray.50" : "#101010"} _hover={{ backgroundColor: "none"}} _active={{ backgroundColor: "none"}}>
                                        <IoChatbubbleEllipsesSharp size={28} cursor={"pointer"}/>
                                    </IconButton>
                                </Tooltip>
                            </Flex>
                        </Box>
                    </Box>
                    <Box display={{ base: "block", md: "none"}} position={"fixed"} right={0} left={0} bottom={0} backgroundColor={colorMode === "light" ? "gray.50" : "#101010"}>
                        <Flex alignItems={"center"} justifyContent={"space-between"} px={8} py={2}>
                            <Tooltip label={"Profile"} hasArrow>
                                <Link as={RouterLink} to={`/profile/${user.username}`}>
                                    <Box p={2.5} _hover={{ bg: colorMode === "light" ? "gray.200" : "whiteAlpha.200" }} cursor={"pointer"} borderRadius={"full"}>
                                        <FaUser size={20}/>
                                    </Box>
                                </Link>
                            </Tooltip>
                            <Tooltip label={"Create post"} hasArrow>
                                <Link as={RouterLink} to={`/create-post`}>
                                    <AddIcon fontSize={22}/>
                                </Link>
                            </Tooltip>
                            <SearchUsersInput />
                            <Button bg={"none"} onClick={toggleColorMode}>
                                {colorMode === "light" ? (<FaMoon size={20}/>) : (<FaSun size={20}/>)}
                            </Button>
                            <Tooltip label={"Sign Out"} hasArrow>
                                <Button isLoading={isLoading} onClick={handleSignOut} size={"md"}>
                                    <CiLogout size={20}/>
                                </Button>
                            </Tooltip>
                        </Flex>
                    </Box>
                </>
            ) : (
                <Container maxW={"800px"} py={3}>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize={"2xl"} fontWeight={"semibold"}>SocialMediaApp</Text>
                        <Flex alignItems={"center"} gap={4}>
                            <Link as={RouterLink} to={"/signin"} _hover={{ color: "blue.400" }}>
                                <Text fontSize={"md"}>Sign In</Text>
                            </Link>
                            <Link as={RouterLink} to={"/signup"} _hover={{ color: "blue.400" }}>
                                <Text fontSize={"md"}>Sign Up</Text>
                            </Link>
                        </Flex>
                    </Flex>
                </Container>
            )}
        </>
    )
}

export default Header