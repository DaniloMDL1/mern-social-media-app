import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useColorMode } from "@chakra-ui/react"

const DeletePostModal = ({ isOpen, onClose, isLoading, handleDeletePost }) => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent backgroundColor={colorMode === "light" ? "gray.50" : "#101010"}>
                <ModalHeader>Delete post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this post?
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='gray' mr={3} onClick={onClose} width={"90px"}>
                        Close
                    </Button>
                    <Button isLoading={isLoading} onClick={handleDeletePost} colorScheme="red" width={"110px"}>
                        Yes, delete
                    </Button>
                </ModalFooter>
            </ModalContent>
      </Modal>
    )
}

export default DeletePostModal