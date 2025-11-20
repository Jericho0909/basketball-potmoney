import { createContext, useState } from "react";
import type { Player } from "../types/models";
import type { Props } from "../types/models";


interface PlayerFormContextType<T> {
    playerOneDetails: Player<T>
    setPlayerOneDetails: React.Dispatch<React.SetStateAction<Player<any>>>
    playerTwoDetails: Player<T>
    setPlayerTwoDetails: React.Dispatch<React.SetStateAction<Player<any>>>

}

const defaultValue: PlayerFormContextType<any> = {
    playerOneDetails: {
        image: "",
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: []
    },
    setPlayerOneDetails: () => {},
    playerTwoDetails: {
        image: "",
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: []
    },
    setPlayerTwoDetails: () => {},
}

const PlayerFormContext = createContext<PlayerFormContextType<any>>(defaultValue)

export const PlayerFormProvider = ({ children }: Props) => {
    const [ playerOneDetails, setPlayerOneDetails ] = useState<Player<any>>({
        image: "",
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: []
    })

    const [ playerTwoDetails, setPlayerTwoDetails ] = useState<Player<any>>({
        image: "",
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: []
    })

    return (
        <PlayerFormContext.Provider
            value={{
                playerOneDetails,
                setPlayerOneDetails,
                playerTwoDetails,
                setPlayerTwoDetails,
            }}
        >
            {children}
        </PlayerFormContext.Provider>
    )
}

export default PlayerFormContext