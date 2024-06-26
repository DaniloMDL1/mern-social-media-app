import { Avatar, Box, Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Text, VStack, useColorMode, useDisclosure } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { useSearchForUsersQuery } from "../redux/user/usersApi"
import { useLocation, useNavigate } from "react-router-dom"
import { useCreateConversationMutation } from "../redux/conversations/conversationsApi"
import useShowToast from "../hooks/useShowToast"
import { useSelector } from "react-redux"

const SearchUsersInput = () => {
    const { user } = useSelector((state) => state.user)
    const [searchTerm, setSearchTerm] = useState("")

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()

    const showToast = useShowToast()

    const { data: searchUsersData, isLoading: isSearchUsersDataLoading } = useSearchForUsersQuery({ searchTerm })

    const [ createConversationApi, { isLoading: isCreateConversationLoading }] = useCreateConversationMutation()

    const handleCreateConversation = async (receiverId) => {
        if(isCreateConversationLoading) return
        try {
            const res = await createConversationApi({ senderId: user._id, receiverId }).unwrap()
            
        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    return (
        <>
            {pathname !== "/chat" && (
                <Box display={{ base: "block", md: "none"}}>
                    <SearchIcon onClick={onOpen} fontSize={22} cursor={"pointer"}/>
                </Box>
            )}
            <Box display={{ base: pathname === "/chat" ? "block" : "none", md: "block"}}>
                <InputGroup width={"100%"}>
                    <Input onClick={onOpen} type="text" placeholder="Search for users"/>
                    <InputRightElement>
                        <SearchIcon color={"gray"}/>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent height={"400px"} backgroundColor={colorMode === "light" ? "gray.50" : "#101010"}>
                    <ModalHeader>Search for users</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflowY={"auto"}>
                        <InputGroup>
                            <Input autoFocus value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search for users"/>
                            <InputRightElement>
                                <SearchIcon color={"gray"}/>
                            </InputRightElement>
                        </InputGroup>
                        {isSearchUsersDataLoading && (
                            <Flex justifyContent={"center"} mt={5}>
                                <Spinner size={"lg"}/>
                            </Flex>
                        )}
                        {!isSearchUsersDataLoading && searchUsersData?.length === 0 && (
                            <Flex justifyContent={"center"} mt={5}>
                                <Text>
                                    No users for this result.
                                </Text>
                            </Flex>
                        )}
                        {searchUsersData && (
                            <VStack width={"full"} alignItems={"flex-start"} gap={0}>
                                {searchUsersData.map((searchUser) => (
                                    <Box key={searchUser._id} width={"full"} onClick={() => {
                                        if(pathname === "/chat") {
                                            handleCreateConversation(searchUser._id)
                                            onClose()
                                            return
                                        }
                                        navigate(`/profile/${searchUser.username}`)
                                        onClose()
                                        setSearchTerm("")
                                    }}>
                                        <Flex alignItems={"center"} _hover={{ backgroundColor: colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}} cursor={"pointer"} gap={3} p={3}>
                                            <Avatar src={searchUser.profilePicture} size={"sm"}/>
                                            <Text fontSize={"md"} isTruncated width={"200px"}>{searchUser.username}</Text>
                                        </Flex>
                                    </Box>
                                ))}
                            </VStack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SearchUsersInput