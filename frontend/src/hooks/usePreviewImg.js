import { useState } from "react"
import useShowToast from "./useShowToast"

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null)
    const showToast = useShowToast()

    const handleImgChange = (e) => {
        const file = e.target.files[0]

        if(file && file.type.startsWith("image/")) {
            const reader = new FileReader()

            reader.onloadend = () => {
                setImgUrl(reader.result)
            }

            reader.readAsDataURL(file)
        } else {
            showToast("Error", "You must select an image file.", "error")
            setImgUrl(null)
        }
    }

    return {
        imgUrl,
        handleImgChange,
        setImgUrl
    }
}

export default usePreviewImg