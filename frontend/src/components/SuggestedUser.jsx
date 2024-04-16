import { Avatar, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useFollowUnfollowUserMutation } from "../redux/user/usersApi"
import useShowToast from "../hooks/useShowToast"
import { useState } from "react"
import { useSelector } from "react-redux"

const SuggestedUser = ({ userData }) => {
    const { user } = useSelector((state) => state.user)

    const [isFollowing, setIsFollowing] = useState(userData.followers.includes(user?._id ))

    const showToast = useShowToast()

    const [ followUnfollowUserApi, { isLoading } ] = useFollowUnfollowUserMutation()

    const handleFollowUnfollowUser = async () => {
        if(isLoading) return
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

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} width={"full"}>
            <Link to={`/profile/${userData.username}`}>
                <Flex alignItems={"center"} gap={3}>
                    <Avatar src={userData.profilePicture} size={"sm"}/>
                    <Text fontSize={"md"} isTruncated width={"140px"}>{userData.username}</Text>
                </Flex>
            </Link>
            <Text onClick={handleFollowUnfollowUser} cursor={"pointer"} color={"blue.400"}>
                {isFollowing ? "Unfollow": "Follow"}
            </Text>
        </Flex>
    )
}

export default SuggestedUser