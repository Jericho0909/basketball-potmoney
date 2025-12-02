import { useContext, useRef, useEffect } from "react"
import ImageContext from "../../../../../context/imageContext"
import type { PlayerFormProps } from "../../../../../types/models"

const PlayerImage = ({ playerDetails, setPlayerDetails }: PlayerFormProps<any>) => {
    const { preview, loadingimg, handleUpload } = useContext(ImageContext)
    const fileRef = useRef<HTMLInputElement | null>(null)

    const handleClick = () => {
        fileRef.current?.click();
    }

    useEffect(() => {
         setPlayerDetails(details => ({
            ...details,
            image: preview,
        }))
    }, [preview])

    return(
        <div 
            onClick={handleClick}
            className="w-[13rem] h-[10rem] bg-gray-200 flex items-center justify-center cursor-pointer rounded-lg mb-1"
        >
            {loadingimg 
                ? (
                    <span>
                        Loading...
                    </span>
                )
                : (
                    playerDetails.image !== ""
                    ? <img
                            src={playerDetails.image || ""}
                            alt="player-Image"
                            loading="lazy"
                            className="w-full h-full"
                        /> 
                    :   <span>
                            click me
                        </span>
                )

            }

            <input 
                ref={fileRef}
                id="fileInput"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpload(e)}
            />
        </div>
    )
}

export default PlayerImage