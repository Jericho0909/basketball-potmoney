import { useState } from "react";
import axios from "axios";
const useVideo = () => {
    const [ vidPreview, setVidPreview ] = useState<string | null>(null)
    const [ loadingVid, setLoadingVid ] = useState<boolean>(false)
    const [ progress, setProgress ] = useState<number>(0)
    
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
                    onUploadProgress: (progressEvent) => {
                        if (!progressEvent.total) return;

                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        setProgress(percent)
                    }
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
        progress, 
        handleUpload 
    };
}

export default useVideo