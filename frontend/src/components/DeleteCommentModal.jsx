import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useColorMode } from '@chakra-ui/react'

const DeleteCommentModal = ({ isOpen, onClose, isLoading, handleDeleteComment }) => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={colorMode === "light" ? "gray.50" : "#101010"}>
            <ModalHeader>Delete comment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you sure you want to delete this comment?
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='gray' mr={3} onClick={onClose} width={"90px"}>
                    Close
                </Button>
                <Button isLoading={isLoading} onClick={handleDeleteComment} colorScheme="red" width={"110px"}>
                    Yes, delete
                </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )
}

export default DeleteCommentModal