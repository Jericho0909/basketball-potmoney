import type { Player } from "../../../../types/models"
import { motion } from "framer-motion";

interface PlayerTwoDetailsProps {
    seletedPlayerDetails: Player<any>,
    handleFullScreen: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => void,
    handleBet: () => void
}

const PlayerTwoDetails = ({ seletedPlayerDetails, handleFullScreen, handleBet }: PlayerTwoDetailsProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                type: "spring",
                damping: 12,
                stiffness: 120
            }}
            className="flex items-center justify-center flex-col w-full"
        >
            <div 
                className="flex items-center justify-center p-1 gap-1 font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)] mb-1"
            >
                <span>
                    Full Name: 
                </span>
                <span className="text-nbaOrange">
                    {seletedPlayerDetails.fullname}
                </span>
            </div>
            <div 
                className="flex items-center justify-center p-1 gap-1 font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)] mb-1"
            >
                <span>
                    Jersey Number: 
                </span>
                <span className="text-nbaOrange">
                    {seletedPlayerDetails.jerseynumber}
                </span>
            </div>
            <div 
                className="flex items-center justify-center p-1 gap-1 font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)] mb-1"
            >
                <span>
                    Champoinship Rings: 
                </span>
                <span className="text-nbaOrange">
                    {seletedPlayerDetails.champoinrings}
                </span>
            </div>
            {seletedPlayerDetails.achievements[0] !== "__empty__" && (
                <span className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                    Achievements
                </span>
            )}
            <div 
                className={`w-[90%] sm:w-[70%] md:w-[65%] lg:w-[60%] xl:w-[70%] h-[5.50rem] p-1 overflow-y-auto scrollbar-custom border mb-1
                    ${seletedPlayerDetails.achievements[0] === "__empty__"
                        ? "flex items-center justify-center flex-col"
                        : "grid grid-cols-2 gap-3"
                    }
                `}
            >
                {seletedPlayerDetails.achievements.map((achievements, index) => (
                    achievements === "__empty__"
                        ? (
                            <p
                                key={index}
                                className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]"
                            >
                                No Achievements yet.
                            </p>
                        )
                        : (
                            <span 
                                key={index}
                                className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)] text-nbaOrange"
                            >
                                {achievements}
                            </span>
                        )
                ))}
            </div>
            <span className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                Highlights
            </span>
            <div className="flex items-center justify-center w-full p-1 gap-2 mb-2">
                {seletedPlayerDetails.highlights.map((vid, index) => (
                    <div 
                    key={index}
                    className="w-[9rem] h-[9rem] overflow-hidden rounded-lg shadow-md"
                    >
                    <video
                        src={vid}
                        onClick={(e) => handleFullScreen(e)}
                        controls
                        className="w-full h-full object-cover"
                    />
                    </div>
                ))}
            </div>
            <button 
                type="button"
                onClick={() => handleBet()}
                className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-6 py-2 rounded
                transition-all duration-200 hoverable:hover:text-black hoverable:hover:border-nbaOrange"
            >
                BET
            </button>
        </motion.div>
    )
}

export default PlayerTwoDetails