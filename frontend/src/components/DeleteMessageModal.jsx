import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorMode } from "@chakra-ui/react"

const DeleteMessageModal = ({ isOpen, onClose, isLoading, handleDeleteMessage }) => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={colorMode === "light" ? "gray.50" : "#101010"}>
            <ModalHeader>Delete message</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you sure you want to delete this message?
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='gray' mr={3} onClick={onClose} width={"90px"}>
                    Close
                </Button>
                <Button isLoading={isLoading} onClick={handleDeleteMessage} colorScheme="red" width={"110px"}>
                    Yes, delete
                </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )
}

export default DeleteMessageModal