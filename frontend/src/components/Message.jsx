import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useDisclosure } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { format } from "date-fns"
import { useGetUserProfileQuery } from "../redux/user/usersApi"
import { BsThreeDotsVertical } from "react-icons/bs"
import DeleteMessageModal from "./DeleteMessageModal"
import { useDeleteMessageMutation } from "../redux/messages/messagesApi"
import useShowToast from "../hooks/useShowToast"

const Message = ({ message }) => {
    const { user } = useSelector((state) => state.user)

    const { data: userData } = useGetUserProfileQuery({ query: message.senderId })

    const { colorMode, toggleColorMode } = useColorMode()

    const showToast = useShowToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [ deleteMessageApi, { isLoading: isDeleteMessageLoading } ] = useDeleteMessageMutation()

    const handleDeleteMessage = async () => {
        try {
            const res = await deleteMessageApi({ messageId: message._id }).unwrap()

            showToast("Success", "Message has been successfully deleted.", "success")
            onClose()
            
        } catch(error) {
            console.error("Error", + error.message)
        }
    }

    return (
        <>
            {message.senderId === user._id ? (
                <Flex alignItems={"center"} flexDir={"row-reverse"} gap={3} mt={5}>
                    <Text fontSize={"xs"} flex={{ base: 0.19, md: 0.12, lg: 0.071}} textAlign={"right"}>
                        {format(new Date(message.createdAt), "hh:mm a")}
                    </Text>
                    <Text flex={0.9} fontSize={"sm"} backgroundColor={"#1e40af"} color={"white"} p={3} maxW={"max-content"} borderRadius={"9px"}>
                        {message.message}
                    </Text>
                    <Menu>
                        <MenuButton>
                            <BsThreeDotsVertical size={16}/>
                        </MenuButton>
                        <MenuList shadow={"none"} background={colorMode === "dark" ? "#18181b" : "#e5e7eb"}>
                            <MenuItem onClick={onOpen} as={Text} background={colorMode === "dark" ? "#27272a" : "#f3f4f6"} cursor={"pointer"} _hover={{ background: colorMode ==="dark" ? "#404040" : "#f8fafc"}}>
                                Unsend
                            </MenuItem>
                            <MenuItem as={Text} background={colorMode === "dark" ? "#27272a" : "#f3f4f6"} mt={1} cursor={"pointer"} _hover={{ background: colorMode ==="dark" ? "#404040" : "#f8fafc"}}>
                                Copy
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            ) : (
                <Flex alignItems={"center"} mt={5}>
                    <Flex gap={3} alignItems={"center"} flex={0.9}>
                        <Avatar src={userData?.profilePicture} size={"md"}/>
                        <Text backgroundColor={colorMode === "light" ? "#f3f4f6" : "#292524"} color={colorMode === "light" ? "black" : "white"} p={4} fontSize={"sm"} maxW={"max-content"} borderRadius={"9px"}>
                            {message.message} 
                        </Text>
                    </Flex>
                    <Text fontSize={"xs"} textAlign={"right"} flex={{ base: 0.19, md: 0.12, lg: 0.099}}>
                        {format(new Date(message.createdAt), "hh:mm a")}
                    </Text>
                </Flex>
            )}
            <DeleteMessageModal isOpen={isOpen} onClose={onClose} isLoading={isDeleteMessageLoading} handleDeleteMessage={handleDeleteMessage}/>
        </>
    )
}

export default Message