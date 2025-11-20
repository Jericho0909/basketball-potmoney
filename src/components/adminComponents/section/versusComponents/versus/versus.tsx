import { useState, useContext } from "react";
import PlayerFormContext from "../../../../../context/playerFormContext";
import PlayerFormOne from "./playerFormOne";
import PlayerFormTwo from "./playerFormTwo";
import type { Player } from "../../../../../types/models";
import { v4 as uuidv4 } from "uuid";

interface VersusType{
    id: string
    playerOne: Player<any>
    playerTwo: Player<any>
    location: string
    money: number
}

const emptyPlayer: Player<any> = {
    image: "",
    fullname: "",
    team: "",
    jerseynumber: 0,
    champoinrings: 0,
    achievements: [],
    pictures: [],
    highlights: []
}
const Versus = () => {
    const matchupId = uuidv4().replace(/-/g, "").slice(0, 5);
    const { playerOneDetails, 
        setPlayerOneDetails,
        playerTwoDetails, 
        setPlayerTwoDetails
    } = useContext(PlayerFormContext)
    const [ matchup, setMatchUp ] = useState<VersusType>({
        id: matchupId,
        playerOne: emptyPlayer,
        playerTwo: emptyPlayer,
        location: "",
        money: 0

    })

    const [ isPlayerOneReady, setIsPlayerOneReady ] = useState<boolean>(false)
    const [ isPlayerTwoReady, setIsPlayerTwoReady ] = useState<boolean>(false)

    const handleSubmitPlayerOne = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPlayerOneReady(true)
        matchup.playerOne = playerOneDetails
    }


    const handleSubmitPlayerTwo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPlayerTwoReady(true)
        setIsPlayerTwoReady(true)
    }

    const hanldeSetMatch = () => {
        console.log(matchup.playerOne)
    }

    return (
        <div className="flex items-center justify-start flex-col w-full h-auto p-1">
            <div className="w-full h-auto text-center"> 
                <span className="text-[clamp(1.10rem,2vw,1.70rem)] font-thin font-anton">
                    Versus
                </span>
            </div>
            <div className="grid grid-cols-2 w-full h-auto gap-1 border border-black mb-[1rem]">
                <div 
                    className={`flex items-center justify-start flex-col bg-red-600 p-1 relative
                        ${isPlayerOneReady ? "blur-[1px]" : ""}
                    `}>
                    <h1 className="text-[1.50rem] font-outfit font-semibold mb-1">
                        Player 1
                    </h1>
                    <form
                        className="flex items-center justify-start flex-col w-full p-1"
                        onSubmit={(e) => handleSubmitPlayerOne(e)}
                    >
                        <PlayerFormOne/>
                        <button 
                            type="submit"
                            className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-5 py-2 rounded
                            transition-all duration-200 hoverable:hover:text-white hoverable:hover:border-white
                            hoverable:hover:bg-blue-600"
                        >
                            Ready
                        </button>
                    </form>
                    {isPlayerOneReady && (
                        <div className="absolute w-full h-full bg-transparent">

                        </div>
                    )}
                </div>
                <div className="flex items-center justify-start flex-col bg-blue-600 p-1">
                    <h1 className="text-[1.50rem] font-outfit font-semibold mb-1">
                        Player 2
                    </h1>
                    <form
                        className="flex items-center justify-start flex-col w-full p-1"
                        onSubmit={(e) => handleSubmitPlayerTwo(e)}
                    >
                        <PlayerFormTwo/>
                        <button 
                            type="submit"
                            className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-5 py-2 rounded
                            transition-all duration-200 hoverable:hover:text-white hoverable:hover:border-white
                            hoverable:hover:bg-red-600"
                        >
                            Ready
                        </button>
                    </form>
                </div>
            </div>
            <button
                type="button"
                onClick={() => hanldeSetMatch()}
                className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-10 py-3 rounded
                transition-all duration-200 hoverable:hover:text-white hoverable:hover:bg-nbaOrange"
            >
                Set Match
            </button>
        </div>
    )
}

export default Versus