import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Text, VStack, useColorMode } from "@chakra-ui/react"
import Follower from "./Follower"

const UserFollowingsModal = ({ userFollowingsData, isFollowingsDataLoading, isOpen, onClose }) => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent backgroundColor={colorMode === "light" ? "gray.50" : "#101010"}>
            <ModalHeader>Followings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {isFollowingsDataLoading && (
                    <Flex justifyContent={"center"} mt={5}>
                        <Spinner size={"lg"}/>
                    </Flex>
                )}
                {!isFollowingsDataLoading && userFollowingsData?.length === 0 && (
                    <Flex justifyContent={"center"}>
                        <Text>
                            No followers for now.
                        </Text>
                    </Flex>
                )}
                {userFollowingsData && (
                    <VStack width={"full"} alignItems={"flex-start"} gap={0}>
                    {userFollowingsData.map((follower) => (
                        <Follower key={follower._id} follower={follower} onClose={onClose}/>
                    ))}
                    </VStack>
                )}
            </ModalBody>
            </ModalContent>
      </Modal>
    )
}

export default UserFollowingsModal