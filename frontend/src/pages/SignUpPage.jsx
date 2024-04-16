import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Link, Text, useColorMode } from "@chakra-ui/react"
import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { useSignupMutation } from "../redux/user/authApi"
import useShowToast from "../hooks/useShowToast"
import { useDispatch } from "react-redux"
import { signUp } from "../redux/user/userSlice"

const SignUpPage = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()

    const { colorMode, toggleColorMode } = useColorMode()

    const showToast = useShowToast()

    const [signUpApi, { isLoading }] = useSignupMutation()

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await signUpApi(inputs).unwrap()

            dispatch(signUp(res))
            
        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
            <Box as="form" onSubmit={handleSignUp} border={"1px solid"} borderColor={colorMode === "light" ? "gray.300" : "whiteAlpha.600"} rounded={"lg"} width={{ base: "280px", md: "360px"}} p={4}>
                <Text fontSize={"2xl"} textAlign={"center"} mb={4}>Sign Up</Text>
                <FormControl isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input 
                        type="text" 
                        value={inputs.fullName}
                        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        autoComplete="off"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input 
                        type="text" 
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        autoComplete="off"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input 
                        type="text" 
                        value={inputs.email}
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        autoComplete="off"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input 
                            type={showPassword ? 'text' : 'password'} 
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            autoComplete="off"
                        />
                        <InputRightElement h={'full'}>
                        <Button
                            variant={'ghost'}
                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button isLoading={isLoading} type="submit" mt={4} mb={2} size={"md"} w={"full"} colorScheme="blue">
                    Sign Up
                </Button>
                <Link as={RouterLink} to={"/signin"} fontSize={"sm"} color={"blue.400"}>Already have an account? Log In</Link>
            </Box>
        </Flex>
    )
}

export default SignUpPage