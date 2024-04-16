import { Flex, useDisclosure } from "@chakra-ui/react"
import { FaRegHeart } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { FaRegComment } from "react-icons/fa"
import { useLikeUnlikePostMutation } from "../redux/posts/postsApi"
import useShowToast from "../hooks/useShowToast"
import { useSelector } from "react-redux"
import { useState } from "react"
import CommentsModal from "./CommentsModal"

const Actions = ({ post }) => {
    const { user } = useSelector((state) => state.user)

    const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id))

    const { isOpen, onOpen, onClose } = useDisclosure()

    const showToast = useShowToast()

    const [ likeUnlikePostApi, { isLoading: isLikeUnlikeLoading } ] = useLikeUnlikePostMutation()

    const handleLikeUnlikePost = async () => {
        if(!user) {
            showToast("Error", "You must be signed in to like a post.", "error")
            return
        }
        if(isLikeUnlikeLoading) return
        try {
            const res = await likeUnlikePostApi({ postId: post._id }).unwrap()

            setIsLiked(!isLiked)
            
        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    return (
        <Flex alignItems={"center"} gap={4} mt={2} px={2}>
            {isLiked ? <FaHeart color="red" onClick={handleLikeUnlikePost} size={22} cursor={"pointer"}/> : <FaRegHeart onClick={handleLikeUnlikePost} size={22} cursor={"pointer"}/>}
            <FaRegComment onClick={() => {
                if(!user) {
                    showToast("Error", "You need to be signed in to see comments a post.", "error")
                    return
                }
                onOpen()
            }} size={22} cursor={"pointer"}/>
            <CommentsModal isOpen={isOpen} onClose={onClose} userId={user?._id} postId={post._id}/>
        </Flex>
    )
}

export default Actions