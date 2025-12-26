import { useState } from "react";
import axios from "axios";
const useImage = () => {
    const [ preview, setPreview ] = useState<string | null>(null)
    const [ loadingimg, setLoadingImg ] = useState<boolean>(false)
    const [ progress, setProgress ] = useState<number>(0)
    
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return

        setLoadingImg(true)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "PlayerPics")

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/daxhmcpkq/image/upload', 
                formData,
                {
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
                const imageUrl = response.data.secure_url
                setPreview(imageUrl)
            }
        } catch (err) {
            console.error('Error uploading image:', err)
        } finally {
            setLoadingImg(false) 
        }
    };

    return { 
        preview,
        setPreview, 
        loadingimg,
        progress,
        handleUpload 
    }
}

export default useImage