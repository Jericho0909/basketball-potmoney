import type { PlayerFormProps } from "../../../../../types/models"
import toTitleCase from "../../../../../utils/toTitleCase"

const PlayerFullName = ({ playerDetails, setPlayerDetails }: PlayerFormProps<any>) => {
    return(
        <div className="flex items-center justify-start gap-1 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[65%] xl:w-[55%]  p-1 mb-1">
            <label 
                className="w-[15rem] text-end font-outfit"
                htmlFor="player-fullname"
            >
                Player Full Name
            </label>
            <input
                id="player-fullname"
                type="text"
                name="fullname"
                placeholder="Jericho Zara"
                required   
                value={playerDetails.fullname}
                onChange={(e) =>
                    setPlayerDetails(details => {
                        const titleCase = toTitleCase(e.target.value)
                        return {
                            ...details,
                            [e.target.name]: titleCase
                        }
                    })
                }
                className="border border-black focus:outline-none focus:ring-1 focus:ring-white focus:border-white shadow-sm
                p-1 w-full bg-black text-white font-outfit"
            />
        </div>
    )
}

export default PlayerFullName