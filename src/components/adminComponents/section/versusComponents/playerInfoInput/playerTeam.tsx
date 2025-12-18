import type { PlayerFormProps } from "../../../../../types/models"
import toTitleCase from "../../../../../utils/toTitleCase"

const PlayerTeam = ({ playerDetails, setPlayerDetails }: PlayerFormProps<any>) => {

    return (
        <div className="flex items-center justify-start gap-1 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[65%] xl:w-[55%]  p-1 mb-1">
            <label 
                className="w-[15rem] text-end font-outfit"
                htmlFor="player-team">
                Player Team
            </label>
            <input
                id="player-team"
                type="text"
                name="team"
                placeholder="Current: Halamanan"
                required      
                value={playerDetails.team}
                onChange={(e) =>
                    setPlayerDetails(details => {
                        const titleCase = toTitleCase(e.target.value)
                        return {
                            ...details,
                            [e.target.name]: titleCase
                        }
                    })
                }
                className="border border-black focus:outline-none focus:ring-1 focus:ring-black focus:border-black shadow-sm
                p-1 w-full bg-white text-black font-outfit"
            />
        </div>
    )
}

export default PlayerTeam