import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useColorMode, Flex, Avatar, InputGroup, Input, InputRightElement, Spinner, Text, IconButton } from '@chakra-ui/react'
import PostComment from './PostComment'
import { IoMdSend } from "react-icons/io";
import { useState } from 'react';
import { useCreateCommentMutation, useGetPostCommentsQuery } from '../redux/comments/commentsApi';
import useShowToast from '../hooks/useShowToast';
import { useSelector } from 'react-redux';

const CommentsModal = ({ isOpen, onClose, userId, postId }) => {
    const { user } = useSelector((state) => state.user)

    const [comment, setComment] = useState("")

    const { colorMode, toggleColorMode } = useColorMode()

    const showToast = useShowToast()

    const { data: postCommentsData, isLoading: isPostCommentsDataLoading } = useGetPostCommentsQuery({ postId })

    const [ createCommentApi, { isLoading: isCreateCommentLoading } ] = useCreateCommentMutation()

    const handleCreateComment = async (e) => {
        e.preventDefault()
        if(!userId) {
            showToast("Error", "You are not authorized to create a comment.", "error")
            return
        }
        if(!comment) {
            showToast("Error", "Comment is required.", "error")
            return
        }
        if(isCreateCommentLoading) return
        try {
            const res = await createCommentApi({ userId, postId, comment }).unwrap()

            setComment("")
            
        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    return (
        <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height={"400px"} backgroundColor={colorMode === "light" ? "gray.50" : "#101010"}>
            <ModalHeader>Comments</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY={"auto"}>
                {isPostCommentsDataLoading && (
                    <Flex justifyContent={"center"} mt={5}>
                        <Spinner size={"lg"}/>
                    </Flex>
                )}
                {!isPostCommentsDataLoading && postCommentsData?.length === 0 && (
                    <Flex justifyContent={"center"}>
                        <Text>
                            No comments for now.
                        </Text>
                    </Flex>
                )}
                {postCommentsData && postCommentsData.map((comment) => (
                    <PostComment key={comment._id} comment={comment}/>
                ))}
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
                <Flex alignItems={"center"} gap={3}>
                    <Avatar src={user?.profilePicture} size={"sm"}/>
                    <InputGroup onSubmit={handleCreateComment} as={"form"} size={"sm"}>
                        <Input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="Add a comment..." rounded={"full"}/>
                        <InputRightElement cursor={"pointer"}>
                            <IconButton type="submit" background={"none"} _hover={{ backgroundColor: "none"}} _active={{ backgroundColor: "none"}}>
                                <IoMdSend size={22}/>
                            </IconButton>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default CommentsModal