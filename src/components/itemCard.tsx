import { useContext, useState } from "react";
import FirebaseActionContext from "../context/firebaseActionContext";
import type { Matchup } from "../types/models";
import type { FirebaseEntity } from "../types/models";
import formatTime12 from "../utils/formatTime12Hour";
import formatDate from "../utils/formatDate";
import compareDate from "../utils/compareDate";
import votesPercentage from "../utils/votesPercentage";
import ShowToast from "../utils/showToast";
import countValidVotes from "../utils/countValidVotes";
import { PhilippinePeso } from 'lucide-react';
import { X } from 'lucide-react';
import isVotingOpen from "../utils/isVotingOpen";
import formatPeso from "../utils/formatPeso";


interface ItemCardProps {
    openTo: string
    match: FirebaseEntity<Matchup<any>>,
    index: number,
    openModal: (id: string) => void
}


const ItemCard = ({openTo, match, index, openModal }: ItemCardProps) => {
    const { removeAction } = useContext(FirebaseActionContext)
    const [ loadedImg1, setLoadedImg1 ] = useState<boolean>(false)
    const [ loadedImg2, setLoadedImg2 ] = useState<boolean>(false)
    const { Toast } = ShowToast()


    const isAllowed = openTo === "homepage" && isVotingOpen(match.date, match.time)

    const deleteMatchUp = async(id: string) => {
        try {
            await removeAction("matchups", id)
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
            onClick={() => {
                if (isAllowed || openTo === "Adminmainpage"){
                    openModal(match.id)
                }
            }}
            className={`flex items-center justify-between w-full h-auto gap-2 p-2 border border-black shadow-sm rounded-lg mb-3 hoverable:hover:shadow-md hoverable:hover:bg-gray-50 hoverable:hover:scale-[1.01] transition-all duration-200
            relative
                ${isAllowed || openTo === "Adminmainpage"
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }
            `}
        >
            {openTo === "Adminmainpage" && (
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        deleteMatchUp(match.firebaseKey)
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
                        {loadedImg1 && (
                            <div
                            className="
                                absolute inset-0
                                rounded-full
                                bg-gray-300
                                lg:animate-pulse
                            "
                            />
                        )}
                        <img
                            src={match.playerOne.pictures[0]}
                            alt="playerOne-Img"
                            loading="lazy"
                            decoding="async"
                            onLoad={() => setLoadedImg1(true)}
                            onError={() => setLoadedImg1(true)}
                            className={`w-[6rem] h-[6rem] sm:w-[7rem] sm:h-[7rem] md:w-[8.50rem] md:h-[8.50rem] lg:w-[9rem] lg:h-[9rem] xl:w-[10rem] xl:h-[10rem] rounded-[50%] object-cover lg:shadow-md lg:ring-2 lg:ring-black
                                 ${loadedImg1 ? "opacity-100" : "opacity-0"}
                            `}
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
                    W: {votesPercentage(countValidVotes(match.playerOne.votes), match.totalVotes)}
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
                        <PhilippinePeso size={16}/>{formatPeso(match.money)}
                    </span>
                </span>
            </div>
            <div
                className="flex items-center justify-start flex-col xl:flex-1"
            >
                <div className="relative w-auto h-auto p-1">
                    <>
                        {!loadedImg2 && (
                            <div
                            className="
                                absolute inset-0
                                rounded-full
                                bg-gray-300
                                lg:animate-pulse
                            "
                            />
                        )}
                        <img
                            src={match.playerTwo.pictures[0]}
                            alt="playerTwo-Img"
                            loading="lazy"
                            decoding="async"
                            onLoad={() => setLoadedImg2(true)}
                            onError={() => setLoadedImg2(true)}
                            className={`w-[6rem] h-[6rem] sm:w-[7rem] sm:h-[7rem] md:w-[8.50rem] md:h-[8.50rem] lg:w-[9rem] lg:h-[9rem] xl:w-[10rem] xl:h-[10rem] rounded-[50%] object-cover lg:shadow-md lg:ring-2 lg:ring-black
                                 ${loadedImg2 ? "opacity-100" : "opacity-0"}
                            `}
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
                    W: {votesPercentage(countValidVotes(match.playerTwo.votes), match.totalVotes)}
                </span>
            </div>
        </div>
    )
}

export default ItemCard