import { useContext } from "react"
import PlayerFormContext from "../../../../../context/playerFormContext"
import PlayerFullName from "../playerInfoInput/playerFullName"
import PlayerTeam from "../playerInfoInput/playerTeam"
import PlayerNumber from "../playerInfoInput/playerNumber"
import PlayerRings from "../playerInfoInput/playerRings"
import PlayerAchievements from "../playerInfoInput/playerAhievements"
import PlayerPics from "../playerInfoInput/playerPics"
import PlayerHighlights from "../playerInfoInput/playerHighlights"


const PlayerFormOne = () => {
    const { playerOneDetails, setPlayerOneDetails } = useContext(PlayerFormContext)

    return(
        <>
            <PlayerFullName
                playerDetails={playerOneDetails}
                setPlayerDetails={setPlayerOneDetails}
            />
            <PlayerTeam
                playerDetails={playerOneDetails}
                setPlayerDetails={setPlayerOneDetails}
            />
            <PlayerNumber
                playerDetails={playerOneDetails}
                setPlayerDetails={setPlayerOneDetails}
            />
            <PlayerRings
                playerDetails={playerOneDetails}
                setPlayerDetails={setPlayerOneDetails}
            />
            <PlayerAchievements
                player="PlayerOne"
            />
            <PlayerPics
                player="PlayerOne"
            />
            <PlayerHighlights
                player="PlayerOne"
            />
        </>
    )
}

export default PlayerFormOne