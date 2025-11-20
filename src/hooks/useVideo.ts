import { useState } from "react";
import axios from "axios";
const useVideo = () => {
    const [ vidPreview, setVidPreview ] = useState<string | null>(null)
    const [ loadingVid, setLoadingVid ] = useState<boolean>(false)
    
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return

        setLoadingVid(true)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "PlayerHighlights")

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/daxhmcpkq/video/upload', formData, {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: 0,
                }

            )

            if (response.data.secure_url) {
                const vidUrl = response.data.secure_url
                setVidPreview(vidUrl)
            }
        } catch (err) {
            console.error('Error uploading image:', err)
        } finally {
            setLoadingVid(false) 
        }
    }

    return { 
        vidPreview,
        setVidPreview, 
        loadingVid, 
        handleUpload 
    };
}

export default useVideo