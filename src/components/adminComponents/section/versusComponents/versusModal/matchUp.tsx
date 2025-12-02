import { useContext } from "react";
import FetchDataContext from "../../../../../context/fetchDataContext";
import MatchUpContext from "../../../../../context/matchupContext";
import PlayerFormContext from "../../../../../context/playerFormContext";
import ActionContext from "../../../../../context/actionContext";
import ModalContext from "../../../../../context/modalContext";
import toTitleCase from "../../../../../utils/toTitleCase";
import ShowToast from "../../../../../utils/showToast";
import type { Player } from "../../../../../types/models";
import type { DataList } from "../../../../../types/models";
import type { Matchup } from "../../../../../types/models";
import { Clock } from 'lucide-react';
import { Calendar } from 'lucide-react';
const MatchUp = () => {
    const { setMatchupList } = useContext(FetchDataContext)
    const { matchup, setMatchUp } = useContext(MatchUpContext)
    const { setPlayerOneDetails, 
        setPlayerTwoDetails,
        setIsPlayerOneReady,
        setIsPlayerTwoReady
    } = useContext(PlayerFormContext)
    const { addAction } = useContext(ActionContext)
    const { toggleModal } = useContext(ModalContext)
    const { Toast } = ShowToast()

    const emptyPlayer: Player<any> = {
        image: "",
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: [],
        votes: []

    }
    console.log(matchup)
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await addAction("matchups", matchup)
            console.log(matchup)
            console.log(response)
            setMatchupList((prev: DataList<Matchup<any>>) => ({
                data: [...prev.data, response]
            }))
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            } else {
                console.error(error)
            }
        } finally {
            setPlayerOneDetails({
                image: "",
                fullname: "",
                team: "",
                jerseynumber: 0,
                champoinrings: 0,
                achievements: [],
                pictures: [],
                highlights: [],
                votes: []
            })
            setPlayerTwoDetails({
                image: "",
                fullname: "",
                team: "",
                jerseynumber: 0,
                champoinrings: 0,
                achievements: [],
                pictures: [],
                highlights: [],
                votes: []

            })
            setMatchUp({
                id: "",
                playerOne: emptyPlayer,
                playerTwo: emptyPlayer,
                location: "",
                time: "",
                date: "",
                money: 0,
                winner: "",
                totalVotes: 0
            })
            setIsPlayerOneReady(false)
            setIsPlayerTwoReady(false)
            toggleModal()
            Toast("success", "The Battle was Settel", 3000)
        }
    }

    return(
        <form 
            onSubmit={(e) => handleSubmit(e)}
            className="flex items-center justify-center flex-col w-full h-auto mt-[1.50rem]"
        >
            <div
                className="flex items-center justify-start gap-1 w-full p-1 mb-1"    
            >
                <label
                    className="w-[4.05rem] text-end text-[clamp(0.80rem,2vw,1rem)] font-outfit"
                    htmlFor="location"
                >
                    Location
                </label>
                <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="Bagong Pook Coliseum, Rosario, Batangas"
                    required
                    value={matchup.location}
                    onChange={(e) => {
                        const titleCase = toTitleCase(e.target.value)
                        setMatchUp(prev => ({
                            ...prev,
                            location: titleCase
                        }))
                    }}
                    className="border border-black focus:outline-none focus:ring-1 focus:ring-white focus:border-white shadow-sm p-1 w-full bg-black text-white font-outfit
                    truncate overflow-hidden whitespace-nowrap"
                />
            </div>
            <div
                className="flex items-center justify-start gap-1 w-full p-1 mb-1"    
            >
                <label
                    className="w-[4.05rem] text-end text-[clamp(0.80rem,2vw,1rem)] font-outfit"
                    htmlFor="time"
                >
                    Time
                </label>
                <div className="pl-1 relative w-[30%]">
                    <input
                    id="time"
                    type="time"
                    name="time"
                    placeholder="4:000pm"
                    required
                    value={matchup.time}
                    onChange={(e) => {
                        setMatchUp(prev => ({
                            ...prev,
                            time: e.target.value
                        }))
                    }}
                    className="border border-black focus:outline-none focus:ring-1 focus:ring-white focus:border-white shadow-sm p-1 w-full bg-black text-white font-outfit"
                    />
                    <span 
                        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Clock size={18} color="white"/>
                    </span>
                </div>
            </div>
            <div
                className="flex items-center justify-start gap-1 w-full p-1 mb-1"    
            >
                <label
                    className="w-[4.05rem] text-end text-[clamp(0.80rem,2vw,1rem)] font-outfit"
                    htmlFor="date"
                >
                    Date
                </label>
                <div className="pl-1 relative w-[30%]">
                    <input
                        id="date"
                        type="date"
                        name="date"
                        placeholder="01/02/2025"
                        required
                        value={matchup.date}
                        onChange={(e) => {
                            setMatchUp(prev => ({
                                ...prev,
                                date: e.target.value
                            }))
                        }}
                        className="border border-black focus:outline-none focus:ring-1 focus:ring-white focus:border-white shadow-sm p-1 w-full bg-black text-white font-outfit"
                    />
                    <span 
                        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Calendar size={18} color="white"/>
                    </span>
                </div>
            </div>
            <div
                className="flex items-center justify-start gap-1 w-full p-1 mb-[2rem]"    
            >
                <label
                    className="w-[4.05rem] text-end font-outfit"
                    htmlFor="money"
                >
                    Money
                </label>
                <input
                    id="money"
                    type="number"
                    name="money"
                    placeholder="500"
                    required
                    value={matchup.money || ""}
                    onChange={(e) => {
                        setMatchUp(prev => ({
                            ...prev,
                            money: Number(e.target.value)
                        }))
                    }}
                    className="border border-black focus:outline-none focus:ring-1 focus:ring-white focus:border-white shadow-sm p-1 w-[30%] bg-black text-white font-outfit"
                />
            </div>
            <button
                type="submit"
                className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-10 py-3 rounded
                transition-all duration-200 hoverable:hover:text-white hoverable:hover:bg-black"
            >
                Game On
            </button>
        </form>
    )
}

export default MatchUp