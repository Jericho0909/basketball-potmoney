import type { PlayerFormProps } from "../../../../../types/models"

const PlayerNumber = ({ playerDetails, setPlayerDetails }: PlayerFormProps<any>) => {
    return(
        <div className="flex items-center justify-start gap-1 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[65%] xl:w-[55%]  p-1 mb-1">
            <label 
                className="w-[15rem] text-end font-outfit"
                htmlFor="player-number">
                Player Number
            </label>
            <input
                id="player-number"
                type="number"
                name="jerseynumber"
                placeholder="0"
                required  
                value={playerDetails.jerseynumber || ""}
                onChange={(e) =>
                    setPlayerDetails(details => (
                        {
                            ...details,
                            [e.target.name]:
                            Number(e.target.value)
                        }
                    ))
                }
                className="border border-black focus:outline-none focus:ring-1 focus:ring-black focus:border-black shadow-sm
                p-1 w-full bg-white text-black font-outfit"
            />
        </div>
    )
}

export default PlayerNumber