import { Avatar, Box, Flex, IconButton, Text, useColorMode, useDisclosure } from "@chakra-ui/react"
import { FaRegHeart } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { useGetUserProfileQuery } from "../redux/user/usersApi"
import { formatDistanceToNow } from "date-fns"
import { useSelector } from "react-redux"
import { MdDelete } from "react-icons/md"
import DeleteCommentModal from "./DeleteCommentModal"
import { useDeleteCommentMutation, useLikeUnlikeCommentMutation } from "../redux/comments/commentsApi"
import useShowToast from "../hooks/useShowToast"
import { useState } from "react"

const PostComment = ({ comment }) => {
    const { user } = useSelector((state) => state.user)

    const [isLiked, setIsLiked] = useState(comment.likes.includes(user?._id))

    const { colorMode, toggleColorMode } = useColorMode()

    const showToast = useShowToast()

    // delete comment modal
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data: userData } = useGetUserProfileQuery({ query: comment.userId })

    const [ deleteCommentApi, { isLoading: isDeleteCommentLoading }] = useDeleteCommentMutation()

    const [ likeUnlikeCommentApi, { isLoading: isLikeUnlikeLoading } ] = useLikeUnlikeCommentMutation()

    const handleDeleteComment = async () => {
        if(!user) {
            showToast("Error", "You must be signed in to delete a comment.", "error")
            return
        }
        try {
            const res = await deleteCommentApi({ commentId: comment._id }).unwrap()

            showToast("Success", "Comment has been successfully deleted.", "success")
            onClose()
            
        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    const handleLikeUnlikeComment = async () => {
        if(!user) {
            showToast("Error", "You must be signed in to like or unlike a comment.", "error")
            return
        }
        if(isLikeUnlikeLoading) return
        try {
            const res = await likeUnlikeCommentApi({ commentId: comment._id }).unwrap()

            setIsLiked(!isLiked)
            
        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    if(!userData) return null

    return (
        <Box mt={5}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"} gap={3}>
                    <Avatar src={userData.profilePicture} size={"sm"}/>
                    <Text fontSize={"xs"} width={"70px"} isTruncated fontWeight={"bold"}>{userData.username}</Text>
                    <Text fontSize={"xs"} color={"gray.light"}>{formatDistanceToNow(new Date(comment.createdAt))} ago</Text>
                </Flex>
                {user?._id === comment.userId && (
                    <>
                        <IconButton onClick={onOpen} _hover={{ backgroundColor: colorMode === "light" ? "gray.50" : "#101010" }} backgroundColor={colorMode === "light" ? "gray.50" : "#101010"}>
                            <MdDelete size={18} cursor={"pointer"} color="red"/>
                        </IconButton>
                        <DeleteCommentModal isLoading={isDeleteCommentLoading} handleDeleteComment={handleDeleteComment} isOpen={isOpen} onClose={onClose}/>
                    </>
                )}
            </Flex>
            <Text mb={2} fontSize={"sm"}>
                {comment.comment}
            </Text>
            {!isLiked ? <FaRegHeart onClick={handleLikeUnlikeComment} size={20} cursor={"pointer"}/> : <FaHeart onClick={handleLikeUnlikeComment} size={20} color="red" cursor={"pointer"}/>}
            <Text fontSize={"sm"} px={1.5}>{comment.likes.length}</Text>
        </Box>
    )
}

export default PostComment