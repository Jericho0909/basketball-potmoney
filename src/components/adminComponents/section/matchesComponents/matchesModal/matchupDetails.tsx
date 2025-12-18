import { useContext, useState, useRef, useEffect } from "react"
import FireBaseFetchDataContext from "../../../../../context/firebaseFetchData"
import FirebaseActionContext from "../../../../../context/firebaseActionContext"
import Table from "../../../../table"
import type { Matchup } from "../../../../../types/models"
import type { FirebaseEntity } from "../../../../../types/models"
import type { TableHeaderType } from "../../../../../types/models"
import type { Player } from "../../../../../types/models"
import type { VoteType } from "../../../../../types/models"
import toTitleCase from "../../../../../utils/toTitleCase"
import formatTime12 from "../../../../../utils/formatTime12Hour"
import formatDate from "../../../../../utils/formatDate"
import { Clock } from 'lucide-react';
import { Calendar } from 'lucide-react';
const MatchUpDetails = () => {
    const { matchupList } = useContext(FireBaseFetchDataContext)
    const { updateAction } = useContext(FirebaseActionContext)
    const [ editLocation, setEditLocation ] = useState<boolean>(false)
    const [ editTime, setEditTime ] = useState<boolean>(false)
    const [ editDate, setEditDate ] = useState<boolean>(false)
    const [ selectedPlayer, setSelectedPlayer ] = useState<string>("")
    const [ whoIsTheWinner, setWhoIsTheWinner ] = useState<string>("")
    const [ winnerPlayerData, setWinnerPlayerData ] = useState<Player<any>>({
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: [],
        votes: []
    })
    const refLocation = useRef<HTMLInputElement | null>(null)
    const refTime = useRef<HTMLInputElement | null>(null)
    const refDate = useRef<HTMLInputElement | null>(null)
    const refWinner = useRef<HTMLSelectElement | null>(null);
    

    const id = sessionStorage.getItem("matchupID")

    const matchup = matchupList.data.find(key => key.id === id)
    if(!matchup) return

    const [updatedMatchUp, setUpatedMatchUp ] = useState<FirebaseEntity<Matchup<any>>>(matchup as FirebaseEntity<Matchup<any>>)

    let key = updatedMatchUp.firebaseKey

    const tableHeader: TableHeaderType[] = [
        {label: "Id", key: "id"},
        {label: "FullName", key: "fullname"},
        {label: "Email", key: "email"},
        {label: "G-Number", key: "gcashnumber"},
        {label: "Bet", key: "bet"},
        {label: "Claimed", key: "claimed"}
    ]

    const handleUpdate = async() => {
        if((matchup.location !== updatedMatchUp.location) || (matchup.time !== updatedMatchUp.time) || (matchup.date !== updatedMatchUp.date) || (updatedMatchUp.winner !== "")){
            await updateAction(
                "matchups", 
                key,
               updatedMatchUp)
        }
        return
    }

    const handleclaimed = async(id: string) => {    
        if(matchup.winner === "") return
        const votes = winnerPlayerData.votes

        const voters: VoteType[] = votes.map(vote =>
            vote.id === id ? { ...vote, claimed: true } : vote
        )

        if(matchup.winner === matchup.playerOne.fullname){
            const updatePlayerOneVotes = {
                ...matchup.playerOne,
                votes: voters
            }

            const updated = {
                ...matchup,
                playerOne: updatePlayerOneVotes
            }

            await updateAction("matchups",
                key, 
                updated
            )

        }

        if(matchup.winner === matchup.playerTwo.fullname){
            const updatePlayerTwoVotes = {
                ...matchup.playerTwo,
                votes: voters
            }

            const updated = {
                ...matchup,
                playerTwo: updatePlayerTwoVotes
            }

            await updateAction("matchups",
                key, 
                updated
            )

        }
        
    }

    useEffect(() => {
        if(editLocation && refLocation.current){
            refLocation.current.focus()
        }

        if(editTime && refTime.current){
            refTime.current.focus()
        }

        if(editDate && refDate.current){
            refDate.current.focus()
        }

    }, [editLocation, editTime, editDate])

    useEffect(() => {
        if(matchup.playerOne.fullname === updatedMatchUp.winner){
            setWinnerPlayerData(matchup.playerOne)
        }

        if(matchup.playerTwo.fullname === updatedMatchUp.winner){
            setWinnerPlayerData(matchup.playerTwo)
        }

    }, [selectedPlayer, whoIsTheWinner])

    return(
        <div className="w-full mt-[1.30rem]">
            <div className="flex items-start justify-center flex-col w-full p-1 mb-1">
                {editLocation
                    ? (
                        <input
                            ref={refLocation}
                            id="location"
                            type="text"
                            name="location"
                            placeholder="Bagong Pook Coliseum, Rosario, Batangas"
                            required
                            spellCheck={false}
                            value={updatedMatchUp.location}
                            onChange={(e) => {
                                const titleCase = toTitleCase(e.target.value)
                                setUpatedMatchUp(prev => ({
                                    ...prev,
                                    location: titleCase
                                }))
                            }}
                            onBlur={() => {
                                setEditLocation(false)
                                handleUpdate()
                            }}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    e.preventDefault()
                                    setEditLocation(false)
                                    handleUpdate()
                                }
                            }}
                            className="customInput2 border border-black focus:outline-none focus:ring-1 focus:ring-white focus:border-white shadow-sm p-1 w-[45%] bg-black text-white font-outfit
                            truncate overflow-hidden whitespace-nowrap mb-1"
                        />
                    )
                    : (
                        <span
                            onClick={() => setEditLocation(true)}
                            className="text-[clamp(0.75rem,2vw,1rem)] font-outfit font-semibold truncate overflow-hidden whitespace-nowrap p-1 cursor-pointer"
                        >
                            {matchup.location}
                        </span>
                    )
                }
                {editTime
                    ? (
                        <div className="pl-1 relative w-[15%]">
                            <input
                                ref={refTime}
                                id="time"
                                type="time"
                                name="time"
                                placeholder="4:000pm"
                                required
                                value={updatedMatchUp.time}
                                onChange={(e) => {
                                    setUpatedMatchUp(prev => ({
                                        ...prev,
                                        time: e.target.value
                                    }))
                                }}
                                onBlur={() => {
                                    setEditTime(false)
                                    handleUpdate()
                                }}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter"){
                                        e.preventDefault()
                                        setEditTime(false)
                                        handleUpdate()
                                    }
                                }}
                                className="customInput2 border border-black focus:outline-none focus:ring-1 focus:ring-white focus:border-white shadow-sm p-1 w-full bg-black text-white font-outfit mb-1"
                            />
                            <span 
                                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Clock size={18} color="white"/>
                            </span>
                        </div>    
                    )
                    : (
                        <span
                            onClick={() => setEditTime(true)}
                            className="text-[clamp(0.75rem,2vw,1rem)] font-outfit font-semibold truncate overflow-hidden whitespace-nowrap p-1 cursor-pointer"
                        >
                            {formatTime12(matchup.time)}
                        </span>
                    )
                }
                {editDate 
                    ? (
                        <div className="pl-1 relative w-[15%]">
                            <input
                                ref={refDate}
                                id="date"
                                type="date"
                                name="date"
                                placeholder=""
                                required
                                value={updatedMatchUp.date}
                                onChange={(e) => {
                                    setUpatedMatchUp(prev => ({
                                        ...prev,
                                        date: e.target.value
                                    }))
                                }}
                                onBlur={() => {
                                    setEditDate(false)
                                    handleUpdate()
                                }}
                                onKeyDown={(e) => {
                                    e.preventDefault()
                                    setEditDate(false)
                                    handleUpdate()
                                }}
                                className="customInput2 border border-black focus:outline-none focus:ring-1 focus:ring-white focus:border-white shadow-sm p-1 w-full bg-black text-white font-outfit mb-1"
                            />
                            <span 
                                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Calendar size={18} color="white"/>
                            </span>
                        </div>    
                    )
                    : (
                        <span
                            onClick={() => setEditDate(true)}
                            className="text-[clamp(0.75rem,2vw,1rem)] font-outfit font-semibold truncate overflow-hidden whitespace-nowrap p-1 cursor-pointer"
                        >
                            {formatDate(matchup.date)}
                        </span>
                    )
                }
                <span
                    className="text-[clamp(0.75rem,2vw,1rem)] font-outfit font-semibold truncate overflow-hidden whitespace-nowrap p-1 cursor-pointer"
                >
                    {matchup.money}
                </span>
                {matchup.winner === "" 
                    ? (
                        <div className="text-[clamp(0.75rem,2vw,1rem)] font-outfit font-semibold truncate overflow-hidden whitespace-nowrap p-1 cursor-pointer">
                            <label 
                                htmlFor="winner"
                                className="pr-1"
                            >
                                Choose the Winner:
                            </label>
                            <select
                                ref={refWinner}
                                id="winner"
                                value={whoIsTheWinner}
                                onChange={(e) => {
                                    setUpatedMatchUp(prev => ({
                                        ...prev,
                                        winner: e.target.value
                                    }))
                                    setWhoIsTheWinner(e.target.value)
                                }}
                                onBlur={() => handleUpdate()}
                                onMouseLeave={() => handleUpdate()}
                            >
                                <option value="">Select a player</option>
                                <option 
                                    value={matchup.playerOne.fullname}
                                    className="text-[clamp(0.75rem,2vw,1rem)] font-outfit font-semibold truncate overflow-hidden whitespace-nowrap p-1 cursor-pointer"
                                >
                                    {matchup.playerOne.fullname}
                                </option>
                                <option 
                                    value={matchup.playerTwo.fullname}
                                    className="text-[clamp(0.75rem,2vw,1rem)] font-outfit font-semibold truncate overflow-hidden whitespace-nowrap p-1 cursor-pointer"
                                    onClick={() => {
                                        refWinner.current?.blur()
                                    }}
                                >
                                    {matchup.playerTwo.fullname}
                                </option>
                            </select>
                        </div>
                    )
                    : (
                        <span
                            className="text-[clamp(0.75rem,2vw,1rem)] font-outfit font-semibold truncate overflow-hidden whitespace-nowrap p-1 cursor-pointer"
                        >
                            The Winner is: {matchup.winner}
                        </span>
                    )
                }
            </div>
            <div className="w-full h-auto ">
                <div className="flex items-center justify-around w-full mb-3">
                    <div 
                        onClick={() => setSelectedPlayer(matchup.playerOne.fullname)}
                        className="w-auto h-auto p-1 cursor-pointer"
                    >
                        <img
                            src={updatedMatchUp.playerOne.pictures[0]}
                            alt="playerOne-Img"
                            loading="lazy"
                            className={`w-[6rem] h-[6rem] sm:w-[7rem] sm:h-[7rem] md:w-[8.50rem] md:h-[8.50rem]
                            lg:w-[9rem] lg:h-[9rem] xl:w-[10rem] xl:h-[10rem] rounded-[50%] object-cover shadow-md ring-2 ring-black transition-all duration-300 ease-in-out hoverable:hover:scale-105 hover:shadow-xl
                                ${selectedPlayer === updatedMatchUp.playerOne.fullname 
                                    ? "scale-110 shadow-2xl ring-2 ring-white"
                                    :"opacity-50scale-90"                       
                                }
                            `}
                        />
                    </div>
                    <div 
                        onClick={() => setSelectedPlayer(matchup.playerTwo.fullname)}
                        className="w-auto h-auto p-1 cursor-pointer"
                    >
                        <img
                            src={updatedMatchUp.playerTwo.pictures[0]}
                            alt="playerOne-Img"
                            loading="lazy"
                            className={`w-[6rem] h-[6rem] sm:w-[7rem] sm:h-[7rem] md:w-[8.50rem] md:h-[8.50rem]
                            lg:w-[9rem] lg:h-[9rem] xl:w-[10rem] xl:h-[10rem] rounded-[50%] object-cover shadow-md ring-2 ring-black transition-all duration-300 ease-in-out hoverable:hover:scale-105 hover:shadow-xl
                                ${selectedPlayer === updatedMatchUp.playerTwo.fullname 
                                    ? "scale-110 shadow-2xl ring-2 ring-white"
                                    :"opacity-50scale-90"                       
                                }
                            `}
                        />
                    </div>
                </div>
                <div className={`flex justify-center w-full h-[23rem] overflow-y-auto scrollbar-custom
                    ${selectedPlayer === "" ? "items-center" : " items-start "}
                `}>
                    {selectedPlayer === ""
                        ? (
                            <p className="font-outfit">
                                Please select a player.
                            </p>
                        )
                        : (
                            selectedPlayer === matchup.playerOne.fullname
                                ? (
                                    <Table 
                                        tableHeader={tableHeader}
                                        tableBody={matchup.playerOne.votes}
                                        winner ={matchup.winner}
                                        handleclaimed={handleclaimed}
                                    />
                                )
                                : (
                                    <Table 
                                        tableHeader={tableHeader}
                                        tableBody={matchup.playerTwo.votes}
                                        winner ={matchup.winner}
                                        handleclaimed={handleclaimed}
                                    />
                                )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MatchUpDetails