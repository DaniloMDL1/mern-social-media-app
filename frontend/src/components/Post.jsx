import { Avatar, Box, Flex, Image, Text, IconButton, useColorMode, useDisclosure } from "@chakra-ui/react"
import Actions from "./Actions"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { useGetUserProfileQuery } from "../redux/user/usersApi"
import { useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import DeletePostModal from "./DeletePostModal"
import { useDeletePostMutation } from "../redux/posts/postsApi"
import useShowToast from "../hooks/useShowToast"

const Post = ({ post }) => {
    const { user } = useSelector((state) => state.user)

    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const showToast = useShowToast()

    const { data: userData } = useGetUserProfileQuery({ query: post.userId })

    const [ deletePostApi, { isLoading: isDeletePostLoading }] = useDeletePostMutation()

    if(!userData) return null

    const handleDeletePost = async () => {
        try {
            const res = await deletePostApi({ postId: post._id }).unwrap()
            
            showToast("Success", "Post has been successfully deleted.", "success")
            onClose()

        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    return (
        <Box p={4} mb={4}>
            <Flex justifyContent={"space-between"} alignItems={"center"} px={1}>
                <Link to={`/profile/${userData.username}`}>
                    <Flex alignItems={"center"} gap={3}>
                        <Avatar src={userData.profilePicture} size={"md"}/>
                        <Text fontSize={"sm"}>{userData.username}</Text>
                    </Flex>
                </Link>
                {user?._id === post.userId && (
                    <>
                        <IconButton onClick={onOpen} _hover={{ backgroundColor: colorMode === "light" ? "gray.50" : "#101010" }} backgroundColor={colorMode === "light" ? "gray.50" : "#101010"}>
                            <MdDelete size={24} cursor={"pointer"} color="red"/>
                        </IconButton>
                        <DeletePostModal isLoading={isDeletePostLoading} handleDeletePost={handleDeletePost} isOpen={isOpen} onClose={onClose}/>
                    </>
                )}
            </Flex>
            <Box borderRadius={"6px"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"} mt={3}>
                <Image src={post.postPicture}/>
            </Box>
            <Actions post={post}/>
            <Text px={2} fontSize={"sm"} mt={2}>
                {post.likes.length} likes
            </Text>
            <Box py={2} px={2}>
                <Text display={"inline"} fontSize={"md"} fontWeight={700}>{userData.username}</Text> {post.desc}
            </Box>
            <Text fontSize={"sm"} px={2} color={"gray.light"}>{formatDistanceToNow(new Date(post.createdAt))} ago</Text>
        </Box>
    )
}

export default Post