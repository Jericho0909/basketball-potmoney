import { useContext, useRef } from "react"
import PlayerFormContext from "../../../../../context/playerFormContext"
import VideoContext from "../../../../../context/videoContext";
import { X } from 'lucide-react';
const AddHighlights = () => {
    const { playerOneDetails, 
        setPlayerOneDetails,
        playerTwoDetails,
        setPlayerTwoDetails 
    } = useContext(PlayerFormContext)
    const { vidPreview, setVidPreview, loadingVid, handleUpload } = useContext(VideoContext)
    const fileRef = useRef<HTMLInputElement>(null)
    const player = sessionStorage.getItem("Saveto")
    const playerHighlights = player === "PlayerOne"
        ? playerOneDetails.highlights
        : playerTwoDetails.highlights

    const handleAdd = (vid: string | null) => {
        if(playerHighlights.length === 3){
            return
        }

        if(player === "PlayerOne"){
            setPlayerOneDetails(prev => ({
                ...prev,
                highlights: [...prev.highlights, vid]
            }))
        }

        if(player === "PlayerTwo"){
            setPlayerTwoDetails(prev => ({
                ...prev,
                highlights: [...prev.highlights, vid]
            }))
        }

        if (fileRef.current) {
            fileRef.current.value = "";
        }
        setVidPreview(null)
        
    }

    const handleRemove = (i: number) => {
        const updatedHighlights = playerHighlights.filter((_, index) => index !== i)
        if(player === "PlayerOne"){
            setPlayerOneDetails(prev => ({
                ...prev,
                highlights: updatedHighlights
            }))
        }

        if(player === "PlayerTwo"){
            setPlayerTwoDetails(prev => ({
                ...prev,
                highlights: updatedHighlights
            }))
        }
    }

    return (
        <>
            <div
                className={`w-full h-[11.50rem] p-1
                    ${playerHighlights.length === 0 && 
                        "flex items-center justify-center"
                    }
                `}
            >
                {playerHighlights.length === 0
                    ? (
                        <span className="font-outfit">
                                No Highlights
                            </span>
                    )
                    : (
                        <div
                            className="w-full max-h-[9.50rem] mt-[1.50rem] p-1"
                        >
                            <ul className="flex items-center justify-center w-full h-full gap-1">
                                {playerHighlights.map((videoUrl, index) => (
                                    <li 
                                        key={index}
                                        className="relative w-[8.80rem] h-[9rem] overflow-hidden border border-black shadow-md rounded-[8px]"
                                    >
                                        <video
                                            src={videoUrl}
                                            controls
                                            className="w-full h-full object-cover"
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
                    id="highlights"
                    type="file"
                    className="w-full text-white font-outfit"
                    onChange={(e) => handleUpload(e)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !loadingVid) {
                        e.preventDefault()
                        handleAdd(vidPreview)
                    }
                    }}
                />
                <button
                    onClick={() => handleAdd(vidPreview)}
                    type="button"
                    className={`font-outfit font-semibold tracking-wider text-white border border-nbaOrange rounded p-1  transition-all duration-200 hoverable:hover:bg-nbaOrange hoverable:hover:text-black hoverable:hover:border-black w-[3.50rem] h-[2rem]
                        ${loadingVid && "cursor-not-allowed"}    
                    `}
                    disabled={loadingVid}
                >
                    {loadingVid ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="w-[1.50rem] h-[1.50rem] loader">

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

export default AddHighlights