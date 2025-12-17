import { useContext } from "react";
import PlayerFormContext from "../../../../../context/playerFormContext";
import ModalContext from "../../../../../context/modalContext";
import MatchUpContext from "../../../../../context/matchupContext";
import PlayerFormOne from "./playerFormOne";
import PlayerFormTwo from "./playerFormTwo";
import ShowToast from "../../../../../utils/showToast";
import { v4 as uuidv4 } from "uuid";

const Versus = () => {
    const { playerOneDetails, 
        playerTwoDetails,
        isPlayerOneReady,
        setIsPlayerOneReady,
        isPlayerTwoReady, 
        setIsPlayerTwoReady
    } = useContext(PlayerFormContext)
    const { setMatchUp } = useContext(MatchUpContext)
    const { toggleModal, setSelectedModal } = useContext(ModalContext)
    const { Toast } = ShowToast()
    const matchupId = uuidv4().replace(/-/g, "").slice(0, 5)

    const handleSubmitPlayerOne = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const safePlayerOneDetails = {
            ...playerOneDetails,
            achievements: playerOneDetails.achievements.length === 0 
                ? ["__empty__"] 
                : [...playerOneDetails.achievements],
            votes: playerOneDetails.votes.length === 0 
                ? [{
                    id: "__empty__",
                    fullname: "__empty__",
                    email: "__empty__",
                    gcashnumber: "__empty__",
                    bet: 0,
                    claimed: false,
                    betOn: "__empty__"
                }]
                : [...playerOneDetails.votes]
        }
        setMatchUp(details => ({
            ...details,
            id: matchupId,
            playerOne: safePlayerOneDetails
        }))
        setIsPlayerOneReady(true)
    }


    const handleSubmitPlayerTwo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const safePlayerTwoDetails = {
            ...playerTwoDetails,
            achievements: playerTwoDetails.achievements.length === 0 
                ? ["__empty__"] 
                : [...playerTwoDetails.achievements],
            votes: playerTwoDetails.votes.length === 0 
                ? [{
                    id: "__empty__",
                    fullname: "__empty__",
                    email: "__empty__",
                    gcashnumber: "__empty__",
                    bet: 0,
                    claimed: false,
                    betOn: "__empty__"
                }]
                : [...playerTwoDetails.votes]
        }

        setMatchUp(details => ({
            ...details,
            playerTwo: safePlayerTwoDetails
        }))
        setIsPlayerTwoReady(true)
    }

    const hanldeSetMatch = () => {
        if(!isPlayerOneReady || !isPlayerTwoReady){
            Toast("error", "Please set the players as ready.", 3000)
            return
        }    
    
        toggleModal()
        setSelectedModal("matchup")
    }

    return (
        <section className="flex items-center justify-start flex-col w-full h-auto p-1">
            <div className="w-full h-auto text-center"> 
                <span className="text-[clamp(1.10rem,2vw,1.70rem)] font-thin font-anton">
                    Versus
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full h-auto gap-1 border border-black mb-[1rem]">
                <div 
                    className="flex items-center justify-start flex-col bg-red-600 p-1 relative">
                    <h1 className="text-[1.50rem] font-outfit font-semibold mb-1">
                        Player 1
                    </h1>
                    <form
                        className={`flex items-center justify-start flex-col w-full p-1
                            ${isPlayerOneReady ? "blur-[1px]" : ""}
                        `}
                        onSubmit={(e) => handleSubmitPlayerOne(e)}
                    >
                        <PlayerFormOne/>
                        {!isPlayerOneReady && (
                            <button 
                                type="submit"
                                className={`font-outfit font-semibold tracking-wider text-black border-2 border-black px-5 py-2 rounded
                                transition-all duration-200 hoverable:hover:text-white hoverable:hover:border-white
                                hoverable:hover:bg-blue-600
                                    ${playerOneDetails.pictures.length !== 3 ||
                                    playerOneDetails.highlights.length !== 2 ? "cursor-not-allowed" : "cursor-pointer"}
                                `}
                                disabled={
                                    playerOneDetails.pictures.length !== 3 ||
                                    playerOneDetails.highlights.length !== 2
                                }
                            >
                                Ready
                            </button>
                        )}
                    </form>
                    {isPlayerOneReady && (
                        <>
                            <div className="flex items-center justify-center flex-col absolute w-full h-full bg-transparent">
                                <img
                                    src={playerOneDetails.pictures[0]}
                                    alt="playerOnePic"
                                    loading="lazy"
                                    className="w-[45%] sm:w-[50%] xl:w-[35%]
                                    h-[50%] border border-black rounded-[50%] shadow-lg"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsPlayerOneReady(false)}
                                className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-8 py-2 rounded z-10
                                transition-all duration-200 hoverable:hover:bg-white"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
                <div
                    className="flex items-center justify-start flex-col bg-blue-600 p-1 relative"
                >
                    <h1 className="text-[1.50rem] font-outfit font-semibold mb-1">
                        Player 2
                    </h1>
                    <form
                        className={`flex items-center justify-start flex-col w-full p-1
                            ${isPlayerTwoReady ? "blur-[1px]" : ""}
                        `}
                        onSubmit={(e) => handleSubmitPlayerTwo(e)}
                    >
                        <PlayerFormTwo/>
                        {!isPlayerTwoReady && (
                            <button 
                                type="submit"
                                className={`font-outfit font-semibold tracking-wider text-black border-2 border-black px-5 py-2 rounded
                                transition-all duration-200 hoverable:hover:text-white hoverable:hover:border-white
                                hoverable:hover:bg-blue-600
                                    ${playerTwoDetails.pictures.length !== 3 ||
                                    playerTwoDetails.highlights.length !== 2 ? "cursor-not-allowed" : "cursor-pointer"}
                                `}
                                disabled={
                                    playerTwoDetails.pictures.length !== 3 ||
                                    playerTwoDetails.highlights.length !== 2
                                }
                            >
                                Ready
                            </button>
                        )}
                    </form>
                    {isPlayerTwoReady && (
                        <>
                            <div className="flex items-center justify-center flex-col absolute w-full h-full bg-transparent">
                                <img
                                    src={playerTwoDetails.pictures[0]}
                                    alt="playerTwoPic"
                                    loading="lazy"
                                    className="w-[45%] sm:w-[50%] xl:w-[35%]
                                    h-[50%] border border-black rounded-[50%] shadow-lg"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsPlayerTwoReady(false)}
                                className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-8 py-2 rounded z-10
                                transition-all duration-200 hoverable:hover:bg-white"
                            >
                                Cancel
                            </button>
                        </>
                    )}
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
        </section>
    )
}

export default Versus