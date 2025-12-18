import { useContext, useEffect, useState } from "react"
import FireBaseFetchDataContext from "../../../context/firebaseFetchData"
import ModalContext from "../../../context/modalContext"
import type { Matchup } from "../../../types/models"
import type { FirebaseEntity } from "../../../types/models"
import ItemCard from "../../itemCard"
import useSectionInView from "../../../hooks/useViewSection"
import { motion } from "framer-motion";

interface VotesProps {
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

interface FirebaseMatchup extends FirebaseEntity<any>, Matchup<any> {}

const Votes = ({ setActiveSection }: VotesProps) => {
    const { matchupList } = useContext(FireBaseFetchDataContext)
    const { setSelectedModal2, toggleModal } = useContext(ModalContext)
    const [ hasAnimated, setHasAnimated ] = useState<boolean>(false) 
    const { ref, isVisible } = useSectionInView()

    const matchupArray: FirebaseMatchup [] = matchupList.data


    const openVotes = (id: string) => {
        setSelectedModal2("vote")
        toggleModal()
        sessionStorage.setItem("VoteID", id)
    }

    const gamesLength = matchupList.data.length

    useEffect(() => {
        if(isVisible){
            setActiveSection("votes")
            setHasAnimated(true)
            history.replaceState(null, "", "#votes")
        }
    }, [isVisible])

    return (
        <motion.section
            ref={ref}
            id="votes"
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`flex items-center  flex-col w-[100%] sm:w-[95%] md:w-[92%] lg:w-[85%] xl:w-[95%] min-h-[50svh] p-1 scroll-mt-[10rem]
                ${gamesLength !== 0
                    ? "justify-start"
                    : "justify-center"
                }
            `}
        >
            <span className="font-bebas font-semibold tracking-wide text-[clamp(1.50rem,3vw,2.50rem)] text-nbaOrange">
                VOTES
            </span>
            {gamesLength !== 0
                ? (
                    <div className="w-full xl:w-[80%] h-auto">
                        {matchupArray.map((match, index) => (
                            <ItemCard
                                key={match.firebaseKey}
                                openTo="homepage"
                                match={match as FirebaseEntity<Matchup<any>>}
                                index={index}
                                openModal={openVotes}
                                
                            />
                        ))}
                    </div>
                )
                : (
                    <p className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        There are no scheduled games.
                    </p>
                )
            }
        </motion.section>
    )
}

export default Votes