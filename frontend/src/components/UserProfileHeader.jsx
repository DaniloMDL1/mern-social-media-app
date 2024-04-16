import { Avatar, Box, Button, Flex, Text, VStack, useColorMode, useDisclosure } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useFollowUnfollowUserMutation, useGetUserFollowersQuery, useGetUserFollowingsQuery } from "../redux/user/usersApi"
import useShowToast from "../hooks/useShowToast"
import { useEffect, useState } from "react"
import UserFollowersModal from "./UserFollowersModal"
import UserFollowingsModal from "./UserFollowingsModal"

const UserProfileHeader = ({ userData }) => {
    const { user } = useSelector((state) => state.user)

    const [isFollowing, setIsFollowing] = useState(userData.followers.includes(user?._id))

    const { colorMode, toggleColorMode } = useColorMode()
    const showToast = useShowToast()

    // followers modal
    const { isOpen: isFollowersModalOpen, onOpen: onFollowersModalOpen, onClose: onFollowersModalClose } = useDisclosure()

    // following modal
    const { isOpen: isFollowingModalOpen, onOpen: onFollowingModalOpen, onClose: onFollowingModalClose } = useDisclosure()

    const [followUnfollowUserApi, { isLoading }] = useFollowUnfollowUserMutation()

    // get user followers api
    const { data: userFollowersData, isLoading: isFollowersDataLoading } = useGetUserFollowersQuery({ userId: userData._id })

    // get user followings api
    const { data: userFollowingsData, isLoading: isFollowingsDataLoading } = useGetUserFollowingsQuery({ userId: userData._id })

    const handleFollowUnfollowUser = async () => {
        if(!user) {
            showToast("Error", "You must be signed in to follow a user.", "error")
            return
        }
        try {
            const res = await followUnfollowUserApi({ userId: userData._id }).unwrap()

            if(isFollowing) {
                showToast("Success", "User has been successfully unfollowed.", "success")
            } else {
                showToast("Success", "User has been successfully followed.", "success")
            }

            setIsFollowing(!isFollowing)
            
        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    useEffect(() => {
        setIsFollowing(userData.followers.includes(user?._id))
    }, [userData])

    return (
        <VStack gap={4} alignItems={"flex-start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>{userData.fullName}</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{userData.username}</Text>
                        <Text fontWeight={"xs"} bg={colorMode === "light" ? "gray.200" : "gray.dark"} p={1} borderRadius={"full"}>
                            socialmedia
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar size={{ base: "lg", sm: "xl" }} src={userData.profilePicture}/>
                </Box>
            </Flex>
            <Text>{userData.bio}</Text>
            {user?._id === userData._id ? (
                <Link to={"/update-profile"}>
                    <Button size={"md"}>Update Profile</Button>
                </Link>
            ) : (
                <Button isLoading={isLoading} onClick={handleFollowUnfollowUser} width={"100px"}>
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text onClick={() => {
                        if(!user) {
                            showToast("Error", "You must be signed in to see followers.", "error")
                            return
                        }
                        onFollowersModalOpen()
                    }} _hover={{ color: colorMode === "light" ? "blackAlpha.900" : "whiteAlpha.600"}} cursor={"pointer"} color={"gray.light"}>
                        {userData.followers.length} followers
                    </Text>
                    <UserFollowersModal userFollowersData={userFollowersData} isFollowersDataLoading={isFollowersDataLoading} isOpen={isFollowersModalOpen} onClose={onFollowersModalClose}/>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Text onClick={() => {
                        if(!user) {
                            showToast("Error", "You must be signed in to see followings.", "error")
                            return
                        }
                        onFollowingModalOpen()
                    }} _hover={{ color: colorMode === "light" ? "blackAlpha.900" : "whiteAlpha.600"}} cursor={"pointer"} color={"gray.light"}>
                        {userData.following.length} following
                    </Text>
                    <UserFollowingsModal userFollowingsData={userFollowingsData} isFollowingsDataLoading={isFollowingsDataLoading} isOpen={isFollowingModalOpen} onClose={onFollowingModalClose}/>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Posts</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Reels</Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserProfileHeader