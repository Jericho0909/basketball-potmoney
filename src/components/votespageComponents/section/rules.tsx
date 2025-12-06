import { useEffect, useState } from "react"
import useSectionInView from "../../../hooks/useViewSection"
import { motion } from "framer-motion";

interface RulesProps {
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

const Rules = ({ setActiveSection }: RulesProps) => {{
    const { ref, isVisible } = useSectionInView()
    const [ hasAnimated, setHasAnimated ] = useState<boolean>(false) 

    useEffect(() => {
        if(isVisible){
            setActiveSection("rules")
            setHasAnimated(true)
            history.replaceState(null, "", "#rules")
        }
    }, [isVisible])

    return (
        <motion.section
            ref={ref}
            id="rules"
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center justify-start flex-col w-[100%] sm:w-[95%] md:w-[92%] lg:w-[85%] xl:w-[80%] min-h-[50svh] p-1 scroll-mt-[10rem]"
        >
            <span className="font-bebas font-semibold tracking-wide text-[clamp(1.50rem,3vw,2.50rem)] text-nbaOrange">
                RULES
            </span>
            <div className="w-full h-auto p-1">
                <span className="font-outfit font-semibold text-[clamp(1rem,3vw,1.10rem)] text-nbaOrange">
                    1. Voting Availability
                </span>
                <ul className="list-disc list-inside pl-4">
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        You can vote anytime as long as the match has not yet started.
                    </li>
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        Once the scheduled game time begins, voting automatically closes for that match.
                    </li>
                </ul>
            </div>
            <div className="w-full h-auto p-1">
                <span className="font-outfit font-semibold text-[clamp(1rem,3vw,1.10rem)] text-nbaOrange">
                    2. Multiple Game Voting
                </span>
                <ul className="list-disc list-inside pl-4">
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        The number of games varies depending on the schedule.
                        <ul className="list-disc list-inside pl-4">
                            <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                                Sometimes there are 3 games in one day,
                            </li>
                            <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                                Sometimes only 1 game for the whole month,
                            </li>
                            <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                                Or any number of games depending on the organizer’s schedule.
                            </li>
                        </ul>
                    </li>
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        You are allowed to vote for every scheduled game, regardless of how many games there are.
                    </li>
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        Each game has its own separate voting, and votes do not carry over to the next match.
                    </li>
                </ul>
            </div>
            <div className="w-full h-auto p-1">
                <span className="font-outfit font-semibold text-[clamp(1rem,3vw,1.10rem)] text-nbaOrange">
                    3. Email Requirement
                </span>
                <ul className="list-disc list-inside pl-4">
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        You may use different emails for voting.
                    </li>
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        All emails must be valid (must exist).
                    </li>
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        Fake or non-existent emails will result in invalid votes.
                    </li>
                </ul>
            </div>
            <div className="w-full h-auto p-1">
                <span className="font-outfit font-semibold text-[clamp(1rem,3vw,1.10rem)] text-nbaOrange">
                    4. Terms of Fair Play
                </span>
                <ul className="list-disc list-inside pl-4">
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        Be respectful.
                    </li>
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        Do not harass players or other voters.
                    </li>
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                       Abusive behavior may result in temporary or permanent ban.
                    </li>
                </ul>
            </div>
            <div className="w-full h-auto p-1">
                <span className="font-outfit font-semibold text-[clamp(1rem,3vw,1.10rem)] text-nbaOrange">
                    5. Disclaimer
                </span>
                <ul className="list-disc list-inside pl-4">
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        “This voting system is for fun and fan engagement. Not affiliated with the NBA, PBA, or any official basketball organization.”
                    </li>
                </ul>
            </div>
            <div className="w-full h-auto p-1">
                <span className="font-outfit font-semibold text-[clamp(1rem,3vw,1.10rem)] text-nbaOrange">
                    6. Privacy Notice
                </span>
                <ul className="list-disc list-inside pl-4">
                    <li className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                       “No personal information is collected. All votes are anonymous.”
                    </li>
                </ul>
            </div>
        </motion.section>
    )
}}

export default Rules