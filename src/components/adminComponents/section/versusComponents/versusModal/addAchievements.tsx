import { useState, useContext, useRef, useEffect } from "react"
import PlayerFormContext from "../../../../../context/playerFormContext"
import toTitleCase from "../../../../../utils/toTitleCase"
import { X } from 'lucide-react';
const AddAchievements = () => {
    const { playerOneDetails, 
        setPlayerOneDetails,
        playerTwoDetails,
        setPlayerTwoDetails 
    } = useContext(PlayerFormContext)
    const [ achievements, setAchievements ] = useState<string>("")
    const [ editingIndex, setEditingIndex ] = useState<number | null>(null);
    const [ editText, setEditText ] = useState<string>("")
    const achievementsRef = useRef<HTMLInputElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const player = sessionStorage.getItem("saveTo")
    const playerAchievements = player === "PlayerOne" 
        ? playerOneDetails.achievements
        : playerTwoDetails.achievements

    const handleAdd = (achievements: string) => {
        const updatedAchievements = [...playerAchievements, achievements]
        if(player === "PlayerOne"){
            setPlayerOneDetails(prev => ({
                ...prev,
                achievements: updatedAchievements
            }))
        }
        if(player === "PlayerTwo"){
            setPlayerTwoDetails(prev => ({
                ...prev,
                achievements: updatedAchievements
            }))
        }
        setAchievements("")

    }

    const handleRemove = (i: number) => {
        const updatedAchievements = playerAchievements.filter((_, index) => index !== i)
        if(player === "PlayerOne"){
            setPlayerOneDetails(prev => ({
                ...prev,
                achievements: updatedAchievements
            }))
        }

        if(player === "PlayerTwo"){
            setPlayerTwoDetails(prev => ({
                ...prev,
                achievements: updatedAchievements
            }))
        }

    }

    const hanleEdit = (edit: string, i: number) => {
        playerAchievements[i] = edit
    } 

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [editingIndex])

    useEffect(() => {
        if (achievementsRef.current) {
            achievementsRef.current.scrollTop = achievementsRef.current.scrollHeight;
        }
    }, [playerAchievements])

    return(
        <>
            <div 
                className={`flex w-full
                    ${playerAchievements.length === 0 ? 
                        "flex items-center justify-center"
                        : ""
                    }
                `}
            >
                {playerAchievements.length === 0
                    ?  (
                        <span className="font-outfit">
                            No Achievements
                        </span>
                    )
                    :   (
                        <div 
                            ref={achievementsRef}
                            className="w-full h-[11rem] p-1 overflow-y-auto scrollbar-custom"
                        >
                            <ul className="w-full h-full list-disc pl-5">
                                {playerAchievements.map((achievement, index) => (
                                    <li 
                                        key={index}
                                        className="font-outfit mb-1 relative"
                                        onClick={() => {
                                            setEditingIndex(index)
                                            setEditText(achievement)
                                        }}
                                    >
                                        {editingIndex === index ? (
                                            <input
                                                ref={inputRef}
                                                className="w-full p-1 border bg-black text-white"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                onBlur={() => {
                                                    hanleEdit(editText, index)
                                                    setEditingIndex(null)

                                                }}
                                            />
                                        ) : (
                                            <span>{achievement}</span>
                                        )}
                                        <button
                                            onClick={() => handleRemove(index)}
                                            className="absolute top-0 right-0"
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
                    id="achievements"
                    type="text"
                    placeholder="ex: MVP"
                    spellCheck={false}
                    value={achievements}
                    onChange={(e) => {
                        const titleCase = toTitleCase(e.target.value)
                        setAchievements(titleCase)
                    }}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            e.preventDefault()
                            handleAdd(achievements)
                        }
                    }}
                    className="customInput2 w-full border-black focus:outline-none focus:ring-1 focus:ring-white focus:border-white shadow-sm p-1 bg-black text-white font-outfit"
                />
                <button
                    type="button"
                    onClick={() => handleAdd(achievements)}
                    className="font-outfit font-semibold tracking-wider text-white border border-nbaOrange rounded p-1  transition-all duration-200 hoverable:hover:bg-nbaOrange hoverable:hover:text-black hoverable:hover:border-black"
                >
                    Add
                </button>
            </div>
        </>
    )
}

export default AddAchievements