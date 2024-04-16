import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Link, Text, useColorMode } from "@chakra-ui/react"
import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { useSigninMutation } from "../redux/user/authApi"
import { useDispatch } from "react-redux"
import { signIn } from "../redux/user/userSlice"
import useShowToast from "../hooks/useShowToast"

const SignInPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const showToast = useShowToast()

    const dispatch = useDispatch()

    const { colorMode, toggleColorMode } = useColorMode()

    const [signInApi, { isLoading }] = useSigninMutation()

    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            const res = await signInApi({ email, password }).unwrap()

            dispatch(signIn(res))
            
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
            <Box as="form" onSubmit={handleSignIn} border={"1px solid"} borderColor={colorMode === "light" ? "gray.300" : "whiteAlpha.600"} rounded={"lg"} width={{ base: "280px", md: "320px"}} p={4}>
                <Text fontSize={"2xl"} textAlign={"center"} mb={4}>Sign In</Text>
                <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                />
                </FormControl>
                <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input 
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
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
                    Sign In
                </Button>
                <Link as={RouterLink} to={"/signup"} fontSize={"sm"} color={"blue.400"}>Don't have an account? Sign Up</Link>
            </Box>
        </Flex>
    )
}

export default SignInPage