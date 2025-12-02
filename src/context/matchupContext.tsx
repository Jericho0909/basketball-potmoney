import { createContext, useState } from "react";
import type { Player } from "../types/models";
import type { Props } from "../types/models";
import type { Matchup } from "../types/models";

interface MatchUpType  {
    matchup: Matchup<any>,
    setMatchUp: React.Dispatch<React.SetStateAction<Matchup<any>>>
}

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

const defaultValue: MatchUpType = {
    matchup: {
        id: "",
        playerOne: emptyPlayer,
        playerTwo: emptyPlayer,
        location: "",
        time: "",
        date: "",
        money: 0,
        winner: "",
        totalVotes: 0
    },
    setMatchUp: () => {}
}

const MatchUpContext = createContext<MatchUpType>(defaultValue)

export const MatchUpProvider = ({children}: Props) => {
    const [ matchup, setMatchUp ] = useState<Matchup<any>>({
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
    return(
        <MatchUpContext.Provider
            value={{
                matchup,
                setMatchUp
            }}
        >
            {children}
        </MatchUpContext.Provider>
    )
}

export default MatchUpContext