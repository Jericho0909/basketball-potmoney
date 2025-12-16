import { useState, useContext } from "react";
import { motion } from "framer-motion";
import FirebaseActionContext from "../../../../context/firebaseActionContext";
import ModalContext from "../../../../context/modalContext";
import type { Matchup } from "../../../../types/models";
import type { Player } from "../../../../types/models";
import type { VoteType } from "../../../../types/models";
import type { FirebaseEntity } from "../../../../types/models";
import { v4 as uuidv4 } from "uuid";
import toTitleCase from "../../../../utils/toTitleCase";
import GCashIcon from "../../../../assets/image/gcash.webp"
import ShowToast from "../../../../utils/showToast";
import countValidVotes from "../../../../utils/countValidVotes";
import sendConfirmation from "../../../../utils/sendVoteConfirmation";

interface BetProps {
    matchup: FirebaseEntity<Matchup<any>>,
    seletedPlayerDetails: Player<any>,

}

const Bet = ({ matchup, seletedPlayerDetails }: BetProps) => {
    const { updateAction } = useContext(FirebaseActionContext)
    const { toggleModal } = useContext(ModalContext)
    const voteId = "V-" + uuidv4().replace(/-/g, "").slice(0, 5)
    const [ vote, setVote ] = useState<VoteType>({
        id: voteId,
        fullname: "",
        email:"",
        gcashnumber: "",
        bet: 0,
        claimed: false,
        betOn: seletedPlayerDetails.fullname
    })
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ isEmailExist, setIsEmailExist ] = useState<boolean>(false)
    const { Toast } = ShowToast()

    const totalVotes = countValidVotes(matchup.playerOne.votes) + countValidVotes(matchup.playerTwo.votes)

    const handleBet = async() => {
        const existingEmail = seletedPlayerDetails.votes.find(key => key.email === vote.email)

        if(existingEmail){
            setIsEmailExist(true)
            Toast("error", "This email is already in play — pick a new one!", 3000)
            return
        }

        const safeData = seletedPlayerDetails.votes.filter(key => key.id !== "__empty__")

        const updatedVotes = [...safeData, vote]
        const updatedPlayer = {...seletedPlayerDetails, votes: updatedVotes}
        const updatedMatchup = {...matchup,
            playerOne: matchup.playerOne.fullname === seletedPlayerDetails.fullname ?  updatedPlayer : {...matchup.playerOne},
            playerTwo: matchup.playerTwo.fullname === seletedPlayerDetails.fullname ?  updatedPlayer : matchup.playerTwo,
            money: matchup.money + vote.bet,
            totalVotes: totalVotes + 1
        }

        try {
            setLoading(true)
            await updateAction("matchups", matchup.firebaseKey, updatedMatchup)
            await sendConfirmation(vote.fullname, vote.email, vote.id)

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            } else {
                console.error(error)
            }
        } finally{
            const timer = setTimeout(() => {
                setLoading(false)
                toggleModal()
            }, 2500)
            
            const timer2 = setTimeout(() => (
                Toast("success", "Bet placed successfully!, Check your Email", 3000)
            ), 2600)
            
            return () => {
                clearTimeout(timer)
                clearTimeout(timer2)
            }
        }

    }
        
    return(
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                type: "spring",
                damping: 12,
                stiffness: 120
            }}
            className="flex items-center justify-center flex-col w-full h-full relative"
        >
            <form 
                className="flex items-center justify-start flex-col p-2 w-full h-auto"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleBet()
                }
                }
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        handleBet()
                    }
                }}
            >
                <div 
                    className="flex items-center justify-start flex-col p-2 w-[95%] xl:w-[47%] bg-[#007DFE] rounded-md shadow-lg  mb-4"
                >
                    <img
                        src={GCashIcon}
                        alt="GCash-Icon"
                        loading="lazy"
                        className="w-[3.90rem] h-[4rem] bg-white rounded-[50%] mb-1"
                    />
                    <div className="flex items-center justify-center p-1 gap-1 w-full">
                        <label 
                            htmlFor="gcash-fullName"
                            className="w-[7rem] text-right whitespace-nowrap font-outfit font-medium"
                        >
                            Full Name
                        </label>
                        <input
                            id="gcash-fullName"
                            type="type"
                            name="fullname"
                            placeholder="Jericho Zara"
                            required
                            value={vote.fullname}
                            onChange={(e) => {
                                const titleCase = toTitleCase(e.target.value)
                                setVote({
                                    ...vote,
                                    [e.target.name]: titleCase
                                })
                            }}
                            className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 placeholder:text-gray-400 text-sm font-outfit font-medium "
                        />
                    </div>
                    <div className="flex items-center justify-center p-1 gap-1 w-full">
                        <label
                            htmlFor="gcash-number"
                            className="w-[7rem] text-right whitespace-nowrap font-outfit font-medium"
                        >
                            Number
                        </label>
                        <input
                            id="gcash-number"
                            type="text"
                            name="gcashnumber"
                            placeholder="09123456789"
                            required
                            maxLength={11}
                            pattern="\d{11}"
                            value={vote.gcashnumber}
                            onChange={(e) => setVote({
                                ...vote,
                                [e.target.name]: e.target.value
                            })}
                            className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 placeholder:text-gray-400 text-sm font-outfit font-medium "
                        />
                    </div>
                    <div className="flex items-center justify-center p-1 gap-1 w-full">
                        <label
                            htmlFor="gcash-bet"
                            className="w-[7rem] text-right whitespace-nowrap font-outfit font-medium"
                        >
                            Bet
                        </label>
                        <input
                            id="gcash-bet"
                            type="number"
                            name="bet"
                            placeholder="Enter your bet"
                            required
                            min={0}
                            step={1}
                            value={vote.bet || ""}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setVote({
                                    ...vote,
                                    bet: value
                                });
                            }}
                            className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 placeholder:text-gray-400 text-sm font-outfit font-medium "
                        />
                    </div>
                    <div className="flex items-center justify-center p-1 gap-1 w-full">
                        <label 
                            htmlFor="email"
                            className="w-[7rem] text-right whitespace-nowrap font-outfit font-medium"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="jericho@gmail.com"
                            required
                            value={vote.email}
                            onChange={(e) => {
                                setVote({
                                    ...vote,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            onFocus={() => setIsEmailExist(false)}
                            className={`w-full p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 placeholder:text-gray-400 text-sm font-outfit font-medium
                                ${isEmailExist ? "border-4 border-red-500" : "border border-gray-300"}
                            `}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center p-1 gap-1 font-outfit font-medium mb-3">
                    <span>
                        BetOn:
                    </span>
                    <span>
                        {seletedPlayerDetails.fullname}
                    </span>
                </div>
                <button 
                type="submit"
                className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-6 py-2 rounded
                transition-all duration-200 hoverable:hover:text-black hoverable:hover:border-nbaOrange"
            >
                CONFRIM
            </button>
            </form>
            {loading && (
                <div className="absolute inset-0 backdrop-blur-[3px] flex items-center justify-center">
                    <div className="loader3"></div>
                </div>
            )}
        </motion.div>
    )
}

export default Bet