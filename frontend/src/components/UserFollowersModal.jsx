import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Text, VStack, useColorMode } from "@chakra-ui/react"
import Follower from "./Follower"

const UserFollowersModal = ({ isOpen, onClose, userFollowersData, isFollowersDataLoading }) => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent backgroundColor={colorMode === "light" ? "gray.50" : "#101010"}>
            <ModalHeader>Followers</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {isFollowersDataLoading && (
                    <Flex justifyContent={"center"} mt={5}>
                        <Spinner size={"lg"}/>
                    </Flex>
                )}
                {!isFollowersDataLoading && userFollowersData?.length === 0 && (
                    <Flex justifyContent={"center"}>
                        <Text>
                            No followers for now.
                        </Text>
                    </Flex>
                )}
                {userFollowersData && (
                    <VStack width={"full"} alignItems={"flex-start"} gap={0}>
                    {userFollowersData.map((follower) => (
                        <Follower key={follower._id} follower={follower} onClose={onClose}/>
                    ))}
                    </VStack>
                )}
            </ModalBody>
            </ModalContent>
      </Modal>
    )
}

export default UserFollowersModal