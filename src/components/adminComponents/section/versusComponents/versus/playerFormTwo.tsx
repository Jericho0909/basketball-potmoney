import { useContext } from "react"
import PlayerFormContext from "../../../../../context/playerFormContext"
import PlayerImage from "../playerInfoInput/playerImage"
import PlayerFullName from "../playerInfoInput/playerFullName"
import PlayerTeam from "../playerInfoInput/playerTeam"
import PlayerNumber from "../playerInfoInput/playerNumber"
import PlayerRings from "../playerInfoInput/playerRings"
import PlayerAchievements from "../playerInfoInput/playerAhievements"
import PlayerPics from "../playerInfoInput/playerPics"
import PlayerHighlights from "../playerInfoInput/playerHighlights"


const PlayerFormTwo = () => {
    const { playerTwoDetails, setPlayerTwoDetails } = useContext(PlayerFormContext)

    return(
        <>
            <PlayerImage
                playerDetails={playerTwoDetails}
                setPlayerDetails={setPlayerTwoDetails}
            />
            <PlayerFullName
                playerDetails={playerTwoDetails}
                setPlayerDetails={setPlayerTwoDetails}
            />
            <PlayerTeam
                playerDetails={playerTwoDetails}
                setPlayerDetails={setPlayerTwoDetails}
            />
            <PlayerNumber
                playerDetails={playerTwoDetails}
                setPlayerDetails={setPlayerTwoDetails}
            />
            <PlayerRings
                playerDetails={playerTwoDetails}
                setPlayerDetails={setPlayerTwoDetails}
            />
            <PlayerAchievements
                player="PlayerTwo"
            />
            <PlayerPics
                player="PlayerTwo"
            />
            <PlayerHighlights
                player="PlayerTwo"
            />
        </>
    )
}

export default PlayerFormTwo