import { createContext } from "react";
import useImage from "../hooks/useImage";
import { Props } from "../types/models";

interface ImageContextType {
    preview: string | null,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    loadingimg: boolean,
    handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultValue:ImageContextType = {
    preview: "",
    setPreview:  () => {},
    loadingimg: false,
    handleUpload: () => {}

}

const ImageContext = createContext<ImageContextType>(defaultValue)

export const ImageProvider = ({children}: Props) => {
    const { preview, setPreview, loadingimg, handleUpload } = useImage()
    return(
        <ImageContext.Provider
            value={{
                preview,
                setPreview,
                loadingimg,
                handleUpload
            }}
        >
            {children}
        </ImageContext.Provider>
    )
}

export default ImageContext