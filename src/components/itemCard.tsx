import { useContext } from "react";
import FetchDataContext from "../context/fetchDataContext";
import ActionContext from "../context/actionContext";
import type { Matchup } from "../types/models";
import formatTime12 from "../utils/formatTime12Hour";
import formatDate from "../utils/formatDate";
import compareDate from "../utils/compareDate";
import votesPercentage from "../utils/votesPercentage";
import ShowToast from "../utils/showToast";
import { PhilippinePeso } from 'lucide-react';
import { X } from 'lucide-react';

interface ItemCardProps {
    openTo: string
    match: Matchup<any>,
    index: number,
    openModal: (id: string) => void
}


const ItemCard = ({openTo, match, index, openModal }: ItemCardProps) => {
    const { matchupList, setMatchupList } = useContext(FetchDataContext)
    const { deleteAction } = useContext(ActionContext)
    const { Toast } = ShowToast()

    const deleteMatchUp = async(id: string) => {
        const updatedList = matchupList.data.filter(key => key.id !== id)
        try {
            await deleteAction("matchups", id)
            setMatchupList({data: updatedList})
            Toast("success", "You have successfully deleted the matchup.", 2000)
        } catch (error) {
            if (error instanceof Error) {
                console.error("Delete failed:", error.message)
            } else {
                console.error("Unknown error:", error)
            }
        }

    }
    return (
        <div
            key={index}
            onClick={() =>openModal(match.id)}
            className="flex items-center justify-between w-full h-auto gap-2 p-2 border border-black shadow-sm rounded-lg cursor-pointer mb-3 hoverable:hover:shadow-md hoverable:hover:bg-gray-50 hoverable:hover:scale-[1.01] transition-all duration-200
            relative"
        >
            {openTo === "Adminmainpage" && (
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        deleteMatchUp(match.id)
                    }}
                    className="absolute top-1 right-2 p-1 rounded-md
                    hover:bg-gray-200 hover:scale-105
                    transition-all duration-200 cursor-pointer "
                >
                    <X size={16} color="black" strokeWidth={3}/>
                </div>
            )}
            <div
                className="flex items-center justify-start flex-col xl:flex-1"
            >
                <div className="relative w-auto h-auto p-1">
                    <>
                        <img
                            src={match.playerOne.pictures[0]}
                            alt="playerOne-Img"
                            loading="lazy"
                            className="w-[6rem] h-[6rem] sm:w-[7rem] sm:h-[7rem] md:w-[8.50rem] md:h-[8.50rem] lg:w-[9rem] lg:h-[9rem] xl:w-[10rem] xl:h-[10rem] rounded-[50%] object-cover shadow-md ring-2 ring-black"
                        />
                        {match.winner !== "" && (
                                <div className={`absolute top-0 left-0 w-full h-full rounded-[50%] pointer-events-none
                                    ${match.winner === match.playerOne.fullname
                                        ? "bg-red-800 opacity-50"
                                        : "bg-green-800 opacity-50"
                                    }
                                `}>
                                <span
                                    className="
                                        absolute 
                                        top-1/2 left-1/2 
                                        -translate-x-1/2 -translate-y-1/2
                                        text-[clamp(2rem,5vw,5rem)] 
                                        font-anton font-semibold tracking-wide 
                                        text-white pointer-events-none
                                    "
                                >
                                    {match.winner === match.playerOne.fullname
                                        ? "W"
                                        : "L"
                                    }
                                </span>
                            </div>
                        )}
                    </>
                </div>
                <span className="text-[clamp(0.85rem,2vw,1.05rem)] font-outfit font-semibold">
                    {match.playerOne.fullname}
                </span>
                <span className="text-[clamp(0.85rem,2vw,1.05rem)] font-outfit font-semibold">
                    W: {votesPercentage(match.playerOne.votes.length, match.totalVotes)}
                </span>
            </div>
            <div className="flex items-center justify-center flex-col flex-1">
                <span className="text-[clamp(1.50rem,2vw,2rem)] font-anton font-semibold tracking-wide">
                    versus
                </span>
                <span className="text-[clamp(0.75rem,2vw,1.10rem)] font-outfit font-semibold truncate overflow-hidden whitespace-nowrap">
                    {compareDate(match.date)}
                </span>
                <span className="text-[clamp(0.75rem,2vw,1.10rem)] font-outfit font-semibold truncate overflow-hidden whitespace-nowrap">
                    {match.location}
                </span>
                <span className="text-[clamp(0.75rem,2vw,1.10rem)] font-outfit font-semibold">
                    {formatTime12(match.time)}
                </span>
                <span className="text-[clamp(0.75rem,2vw,1.10rem)] font-outfit font-semibold">
                    {formatDate(match.date)}
                </span>
                <span className="flex items-center justify-center text-[clamp(0.75rem,2vw,1.05rem)] font-outfit font-semibold gap-1 flex-nowrap">
                    <span>
                        Total Pot 
                    </span>
                    <span className="flex items-center justify-center">
                        <PhilippinePeso size={16}/>{match.money}
                    </span>
                </span>
            </div>
            <div
                className="flex items-center justify-start flex-col xl:flex-1"
            >
                <div className="relative w-auto h-auto p-1">
                    <>
                        <img
                            src={match.playerTwo.pictures[0]}
                            alt="playerTwo-Img"
                            loading="lazy"
                            className="w-[6rem] h-[6rem] sm:w-[7rem] sm:h-[7rem] md:w-[8.50rem] md:h-[8.50rem] lg:w-[9rem] lg:h-[9rem] xl:w-[10rem] xl:h-[10rem] rounded-[50%] object-cover shadow-md ring-2 ring-black"
                        />
                        {match.winner !== "" && (
                                <div className={`absolute top-0 left-0 w-full h-full rounded-[50%] pointer-events-none
                                    ${match.winner === match.playerTwo.fullname
                                        ? "bg-red-800 opacity-50"
                                        : "bg-green-800 opacity-50"
                                    }
                                `}>
                                <span
                                    className="
                                        absolute 
                                        top-1/2 left-1/2 
                                        -translate-x-1/2 -translate-y-1/2
                                        text-[clamp(2rem,5vw,5rem)] 
                                        font-anton font-semibold tracking-wide 
                                        text-white pointer-events-none
                                    "
                                >
                                    {match.winner === match.playerTwo.fullname
                                        ? "W"
                                        : "L"
                                    }
                                </span>
                            </div>
                        )}
                    </>
                </div>
                <span className="text-[clamp(0.85rem,2vw,1.05rem)] font-outfit font-semibold">
                    {match.playerTwo.fullname}
                </span>
                <span className="text-[clamp(0.85rem,2vw,1.05rem)] font-outfit font-semibold">
                    W: {votesPercentage(match.playerTwo.votes.length, match.totalVotes)}
                </span>
            </div>
        </div>
    )
}

export default ItemCard