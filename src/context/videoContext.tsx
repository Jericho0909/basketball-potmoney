import { createContext } from "react";
import useVideo from "../hooks/useVideo";
import type { Props } from "../types/models";

interface VideoContextType {
    vidPreview: string | null,
    setVidPreview: React.Dispatch<React.SetStateAction<string | null>>,
    loadingVid: boolean,
    progress: number,
    handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const defaultValue: VideoContextType = {
    vidPreview: "",
    setVidPreview: () => {},
    loadingVid: false,
    progress: 0,
    handleUpload: () => {}
}

const VideoContext = createContext<VideoContextType>(defaultValue)

export const VideoProvider = ({children}: Props) => {
    const { vidPreview, setVidPreview, loadingVid, progress, handleUpload } = useVideo()
    return(
        <VideoContext.Provider
            value={{
                vidPreview,
                setVidPreview, 
                loadingVid,
                progress,
                handleUpload
            }}
        >
            {children}
        </VideoContext.Provider>
    )
}

export default VideoContext