import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Avatar, Center, useColorMode } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import usePreviewImg from '../hooks/usePreviewImg'
import { useUpdateProfileMutation } from '../redux/user/usersApi'
import useShowToast from '../hooks/useShowToast'
import { updateProfile } from '../redux/user/userSlice'

const UpdateProfilePage = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        password: "",
        bio: user.bio
    })
    const { imgUrl, handleImgChange } = usePreviewImg()
    const profilePictureRef = useRef(null)

    const { colorMode, toggleColorMode } = useColorMode()
    const showToast = useShowToast()

    const [ updateProfileApi, { isLoading } ] = useUpdateProfileMutation()

    const handleUpdateProfile = async () => {
        try {
            const res = await updateProfileApi({ userId: user._id, ...inputs, profilePicture: imgUrl }).unwrap()

            showToast("Success", "Profile has been successfully updated.", "success")
            dispatch(updateProfile(res))
            
        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    return (
        <Flex align={'center'} justify={'center'}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={colorMode === "light" ? "white" : "gray.dark"}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: 'xl', sm: '2xl' }}>
                    Update Profile
                </Heading>
                <FormControl>
                <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                        <Avatar size="xl" src={imgUrl || user.profilePicture}/>
                    </Center>
                    <Center w="full">
                        <Button w="full" onClick={() => profilePictureRef.current.click()}>Change Avatar</Button>
                        <Input type="file" hidden ref={profilePictureRef} onChange={handleImgChange}/>
                    </Center>
                </Stack>
                </FormControl>
                <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                    placeholder="Full Name"
                    type="text"
                    autoComplete="off"
                    value={inputs.fullName}
                    onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                />
                </FormControl>
                <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                    placeholder="Username"
                    type="text"
                    autoComplete="off"
                    value={inputs.username}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
                </FormControl>
                <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input
                    placeholder="Email Address"
                    type="email"
                    autoComplete="off"
                    value={inputs.email}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                />
                </FormControl>
                <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="off"
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                </FormControl>
                <FormControl>
                <FormLabel>Bio</FormLabel>
                <Input
                    placeholder="Bio"
                    type="text"
                    autoComplete="off"
                    value={inputs.bio}
                    onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                <Button
                    colorScheme='blue'
                    w="full"
                    onClick={handleUpdateProfile}
                    isLoading={isLoading}
                >
                    Update Profile
                </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default UpdateProfilePage