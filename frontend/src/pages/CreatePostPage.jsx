import { Textarea, VStack, Container, Input, Text, Box, Image, CloseButton, Button } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { BsFillImageFill } from "react-icons/bs"
import usePreviewImg from "../hooks/usePreviewImg"
import { useCreatePostMutation } from "../redux/posts/postsApi"
import useShowToast from "../hooks/useShowToast"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const CreatePostPage = () => {
    const { user } = useSelector((state) => state.user)

    const [desc, setDesc] = useState("")
    const postPictureRef = useRef(null)

    const navigate = useNavigate()

    const { imgUrl, handleImgChange, setImgUrl } = usePreviewImg()
    const showToast = useShowToast()

    const [ createPostApi, { isLoading }] = useCreatePostMutation()

    const handleCreatePost = async () => {
        try {
            const res = await createPostApi({ desc, postPicture: imgUrl, userId: user._id }).unwrap()

            showToast("Success", "Post has been successfully created.", "success")
            navigate(`/profile/${user.username}`)
            
        } catch(error) {
            if(error.data) {
                showToast("Error", error.data.error, "error")
            } else {
                showToast("Error", error.message, "error")
            }
        }
    }

    return (
        <Container maxW={"xs"} py={"30px"}>
            <VStack flexDirection={"column"} alignItems={"flex-start"} gap={4}>
                <Text fontSize={"2xl"} alignSelf={"center"}>Create Post</Text>
                <Textarea resize={"none"} placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                <Input type="file" hidden ref={postPictureRef} onChange={handleImgChange}/>
                <BsFillImageFill onClick={() => postPictureRef.current.click()} cursor={"pointer"} size={25} style={{ marginTop: "20px" }}/>

                {imgUrl && (
                    <Box mt={4} position={"relative"}>
                        <Image src={imgUrl}/>
                        <CloseButton onClick={() => setImgUrl(null)} position={"absolute"} right={0} top={-10} color={"white"}/>
                    </Box>
                )}

                <Button isLoading={isLoading} onClick={handleCreatePost} colorScheme="blue" width={"100%"} mt={"10px"}>
                    Post
                </Button>
            </VStack>
        </Container>
    )
}

export default CreatePostPage