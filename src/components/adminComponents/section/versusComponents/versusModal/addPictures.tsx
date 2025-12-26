import { useContext, useRef } from "react"
import PlayerFormContext from "../../../../../context/playerFormContext"
import ImageContext from "../../../../../context/imageContext";
import { X } from 'lucide-react';
const AddPictures = () => {
    const { playerOneDetails, 
        setPlayerOneDetails,
        playerTwoDetails,
        setPlayerTwoDetails 
    } = useContext(PlayerFormContext)
    const { preview, 
        setPreview, 
        loadingimg,
        progress, 
        handleUpload } = useContext(ImageContext)
    const player = sessionStorage.getItem("savetO")
    const playerPics = player === "PlayerOne"
        ? playerOneDetails.pictures
        : playerTwoDetails.pictures

    const fileRef = useRef<HTMLInputElement>(null)

    console.log(progress)

    const handleAdd = (img: string | null) => {
        if(playerPics.length === 3){
            return
        }

        if(player === "PlayerOne"){
            setPlayerOneDetails(prev => ({
                ...prev,
                pictures: [...prev.pictures, img]
            }))
        }

        if(player === "PlayerTwo"){
            setPlayerTwoDetails(prev => ({
                ...prev,
                pictures: [...prev.pictures, img]
            }))
        }

        if(fileRef.current) {
            fileRef.current.value = "";
        }

        setPreview(null)
        
    }

    const handleRemove = (i: number) => {
        const updatedPictures = playerPics.filter((_, index) => index !== i)
        if(player === "PlayerOne"){
            setPlayerOneDetails(prev => ({
                ...prev,
                pictures: updatedPictures
            }))
        }

        if(player === "PlayerTwo"){
            setPlayerTwoDetails(prev => ({
                ...prev,
                pictures: updatedPictures
            }))
        }
    }

    return(
        <>
            <div 
                className={`w-full h-[11.50rem] p-1
                    ${playerPics.length === 0 && 
                        "flex items-center justify-center"
                    }
                `}
            >
                <span className="absolute top-0 font-outfit">
                    {player === "PlayerOne"
                        ? (
                            `${playerOneDetails.pictures.length}/3`
                        )
                        : (
                            `${playerTwoDetails.pictures.length}/3`
                        )
                    }
                </span>
                {playerPics.length === 0
                    ?  (
                        <span className="font-outfit">
                            No Pictures
                        </span>
                    )
                    : (
                        <div
                            className="w-full max-h-[9.50rem] mt-[1rem] p-1"
                        >
                            <ul className="flex items-center justify-center sm:justify-around  w-full h-full gap-1">
                                {playerPics.map((pics, index) => (
                                    <li 
                                        key={index}
                                        className="relative w-[8.80rem] h-[9rem] overflow-hidden border border-black shadow-md rounded-[8px]"
                                    >
                                        <img
                                            src={pics}
                                            alt="player-pic"
                                            className="w-full h-full"
                                            loading="lazy"
                                        />
                                        <button
                                            onClick={() => handleRemove(index)}
                                            className="flex items-center justify-center absolute top-0 right-0 w-auto h-auto p-[0.10rem] bg-black rounded-[50%]"
                                        >
                                            <X size={13} color="red"/>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div> 
                    )
                }
            </div>
            <div className="flex items-center justify-center absolute bottom-1 w-[98%] gap-1 p-1 bg-black">
                <input
                    ref={fileRef}
                    id="pictures"
                    type="file"
                    accept="image/*"
                    className="w-full text-white font-outfit"
                    onChange={(e) => handleUpload(e)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter"){
                            e.preventDefault()
                            handleAdd(preview)
                        }
                    }}
                />
                <button
                    onClick={() => handleAdd(preview)}
                    type="button"
                    className={`font-outfit font-semibold tracking-wider text-white border border-nbaOrange rounded p-1  transition-all duration-200 hoverable:hover:bg-nbaOrange hoverable:hover:text-black hoverable:hover:border-black w-[3.50rem] h-[2rem]
                        ${(loadingimg || preview === null) 
                            ? "cursor-not-allowed"
                            : ""
                        }    
                    `}
                    disabled={loadingimg || preview === null}
                >
                    {loadingimg ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="flex items-center justify-center w-[3rem] h-[1.50rem]">
                                {progress}%
                            </div>
                        </div>
                        ) : (
                            <span>Add</span>
                        )
                    }
                </button>
            </div>
        </>
    )
}

export default AddPictures