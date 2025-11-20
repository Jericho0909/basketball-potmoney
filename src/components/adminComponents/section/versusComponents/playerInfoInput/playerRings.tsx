import type { PlayerFormProps } from "../../../../../types/models"

const PlayerRings = ({ playerDetails, setPlayerDetails }: PlayerFormProps<any>) => {
    return(
        <div className="flex items-center justify-start gap-1 w-[50%] p-1 mb-1">
            <label 
                className="w-[15rem] text-end font-outfit"
                htmlFor="player-rings">
                Player Rings
            </label>
            <input
                id="player-rings"
                type="number"
                name="champoinrings"
                placeholder="0"
                required    
                value={playerDetails.champoinrings || ""}
                onChange={(e) =>
                    setPlayerDetails(details => (
                        {
                            ...details,
                            [e.target.name]:
                            Number(e.target.value)
                        }
                    ))
                }
                className="border border-black focus:outline-none focus:ring-1 focus:ring-white focus:border-white shadow-sm
                p-1 w-full bg-black text-white font-outfit"
            />
        </div>
    )
}

export default PlayerRings