import { createContext, useState } from "react";
import type { Player } from "../types/models";
import type { Props } from "../types/models";



interface PlayerFormContextType<T> {
    playerOneDetails: Player<T>
    setPlayerOneDetails: React.Dispatch<React.SetStateAction<Player<any>>>
    playerTwoDetails: Player<T>
    setPlayerTwoDetails: React.Dispatch<React.SetStateAction<Player<any>>>
    isPlayerOneReady: boolean
    setIsPlayerOneReady: React.Dispatch<React.SetStateAction<boolean>>
    isPlayerTwoReady: boolean
    setIsPlayerTwoReady: React.Dispatch<React.SetStateAction<boolean>>

}

const defaultValue: PlayerFormContextType<any> = {
    playerOneDetails: {
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: [],
        votes: []
    },
    setPlayerOneDetails: () => {},
    playerTwoDetails: {
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: [],
        votes: []
    },
    setPlayerTwoDetails: () => {},
    isPlayerOneReady: false,
    setIsPlayerOneReady: () => {},
    isPlayerTwoReady: false,
    setIsPlayerTwoReady: () => {}
}

const PlayerFormContext = createContext<PlayerFormContextType<any>>(defaultValue)

export const PlayerFormProvider = ({ children }: Props) => {
    const [ playerOneDetails, setPlayerOneDetails ] = useState<Player<any>>({
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: [],
        votes: []
    })

    const [ playerTwoDetails, setPlayerTwoDetails ] = useState<Player<any>>({
        fullname: "",
        team: "",
        jerseynumber: 0,
        champoinrings: 0,
        achievements: [],
        pictures: [],
        highlights: [],
        votes: []
    })

    const [ isPlayerOneReady, setIsPlayerOneReady ] = useState<boolean>(false)
    const [ isPlayerTwoReady, setIsPlayerTwoReady ] = useState<boolean>(false)

    return (
        <PlayerFormContext.Provider
            value={{
                playerOneDetails,
                setPlayerOneDetails,
                playerTwoDetails,
                setPlayerTwoDetails,
                isPlayerOneReady,
                setIsPlayerOneReady,
                isPlayerTwoReady,
                setIsPlayerTwoReady

            }}
        >
            {children}
        </PlayerFormContext.Provider>
    )
}

export default PlayerFormContext