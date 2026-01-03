import { useContext, useEffect, useState } from "react"
import FireBaseFetchDataContext from "../../../context/firebaseFetchData"
import type { Player } from "../../../types/models"
import type { VoteKey } from "../../../types/models"
import type { Matchup } from "../../../types/models"
import type { FirebaseEntity } from "../../../types/models"
import PlayerOneDetails from "./voteComponents/playerOneDetails"
import PlayerTwoDetails from "./voteComponents/playerTwoDetails"
import Bet from "./voteComponents/bet"
const Vote = () => {
    const { matchupList } = useContext(FireBaseFetchDataContext)
    const [ index, setIndex ] = useState<number>(0)
    const [ index2, setIndex2 ] = useState<number>(0)
    const [ selectedComponents, setSelectedComponents ] = useState<VoteKey>("")
    const [ selectedPlayer, setSelectedPlayer ] = useState<string>("")
    const [ seletedPlayerDetails, setSeletedPlayerDetails ] = useState<Player<any>>({
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: [],
        votes: []
    }) 

    const voteID = sessionStorage.getItem("VoteID")
    const matchup = matchupList.data.find(key => key.id === voteID)

    if(!matchup) return

    const player1Pictures = [ ...matchup.playerOne.pictures ]
    const player2Pictures = [ ...matchup.playerTwo.pictures ]


     const handleBet = () => {
        setSelectedComponents("bet")
    }

    const voteComponents: Record<Exclude<VoteKey, "">, React.ReactNode> = {
        playerOneDetails: 
            <PlayerOneDetails
                seletedPlayerDetails={seletedPlayerDetails}
                handleBet={handleBet}
            />,
        playerTwoDetails: 
            <PlayerTwoDetails 
                seletedPlayerDetails={seletedPlayerDetails}
                handleBet={handleBet}
            />,
        bet: 
            <Bet 
                matchup={matchup as FirebaseEntity<Matchup<any>>}
                seletedPlayerDetails={seletedPlayerDetails}
            />,
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % player1Pictures.length)
            setIndex2(prev => (prev + 1) % player2Pictures.length)
        }, 3500)

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if(selectedPlayer === matchup.playerOne.fullname){
            setSeletedPlayerDetails(matchup.playerOne)
        }

        if(selectedPlayer === matchup.playerTwo.fullname){
            setSeletedPlayerDetails(matchup.playerTwo)
        }

    }, [selectedPlayer])

    return (
        <div className="flex items-center justify-center flex-col w-full sm:w-[98%] md:w-[94%] h-auto p-1 mx-1 border border-black bg-white rounded-md">
            <span className="font-bebas font-semibold tracking-wide text-[clamp(1.20rem,3vw,2.20rem)]">
                Select a Player
            </span>
            <div className="flex items-center justify-between w-full xl:w-[80%] h-auto p-2 mb-2">
                <div 
                    className={`w-[8rem] h-[11rem] p-1 rounded-md overflow-hidden flex items-center justify-center 
                    transition-all duration-300 ease-out cursor-pointer
                    hoverable:hover:scale-105 hover:shadow-lg
                        ${selectedPlayer === matchup.playerOne.fullname 
                            ? "scale-110 shadow-2xl border-2 border-nbaOrange" 
                            : "scale-100 shadow-md"
                        }
                    `}
                    onClick={() => {
                        setSelectedPlayer(matchup.playerOne.fullname)
                        setSelectedComponents("playerOneDetails")
                    }}
                >
                    <img
                        src={player1Pictures[index]}
                        alt="imgSlideShow"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div 
                    className={`w-[8rem] h-[11rem] p-1 rounded-md overflow-hidden flex items-center justify-center 
                    transition-all duration-300 ease-out cursor-pointer
                    hoverable:hover:scale-105 hover:shadow-lg
                        ${selectedPlayer === matchup.playerTwo.fullname 
                            ? "scale-110 shadow-2xl border-2 border-nbaOrange" 
                            : "scale-100 shadow-md"
                        }
                    `}
                    onClick={() => {
                        setSelectedPlayer(matchup.playerTwo.fullname)
                        setSelectedComponents("playerTwoDetails")
                    }}
                >
                    <img
                        src={player2Pictures[index2]}
                        alt="imgSlideShow"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            </div>
            <div 
                className={`flex items-center flex-col w-full h-[29.10rem] p-1 border border-black rounded-md 
                    ${selectedPlayer !== ""
                        ? "justify-start"
                        : "justify-center"
                    }
                `}
            >
                {selectedPlayer !== ""
                    ? (
                        selectedComponents !== "" && voteComponents[selectedComponents]
                    )
                    : (
                        <p className="font-outfit">
                            Choose a player to view details
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default Vote