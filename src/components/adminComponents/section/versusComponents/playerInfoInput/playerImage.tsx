import { useRef } from "react"
import type { PlayerFormProps } from "../../../../../types/models"

const PlayerImage = ({ playerDetails, setPlayerDetails }: PlayerFormProps<any>) => {
    const fileRef = useRef<HTMLInputElement | null>(null)

    const handleClick = () => {
        fileRef.current?.click();
    }

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);

        setPlayerDetails(details => ({
            ...details,
            image: previewURL,
        }))
    }
    return(
        <div 
            onClick={handleClick}
            className="w-[13rem] h-[10rem] bg-gray-200 flex items-center justify-center cursor-pointer rounded-lg mb-1"
        >
            {playerDetails.image !== ""
                ? <img
                    src={playerDetails.image}
                    alt="player-Image"
                    loading="lazy"
                /> 
                :   <span>
                        click me
                    </span>
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