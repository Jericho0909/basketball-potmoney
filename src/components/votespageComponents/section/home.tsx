import { useEffect, useState } from "react"
import BasketballCourt from "../../../assets/image/Pbasketball4.jfif"
import useSectionInView from "../../../hooks/useViewSection"
import { motion } from "framer-motion";

interface HomeProps {
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

const Home = ({ setActiveSection }: HomeProps) => {
    const { ref, isVisible } = useSectionInView()
    const [ hasAnimated, setHasAnimated ] = useState<boolean>(false) 

    useEffect(() => {
        if(isVisible){
            setActiveSection("home")
            setHasAnimated(true)
            history.replaceState(null, "", "#home")
        }
    }, [isVisible])

    return(
        <motion.section 
            ref={ref}
            id="home"
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-[100wv] h-[87svh] p-1 my-1 scroll-mt-40"
        >
            <img
                src={BasketballCourt}
                alt="BasketballCourt"
                loading="lazy"
                className="inset-0 w-full xl:w-[85svw] h-full object-cover object-center z-0 rounded-md"
            />
            <div 
                className="absolute inset-0 flex items-center justify-center flex-col font-outfit text-[clamp(2rem,5vw,5rem)] tracking-wider text-nbaOrange font-bold"
            >
                <div className="font-outfit text-[clamp(2rem,5vw,5rem)] tracking-wider text-nbaOrange font-bold">
                    {"BASKETBALL".split("").map((letter, i) => (
                    <span 
                        key={i}
                        className="mx-[2px] drop-shadow-[2px_3px_0px_rgba(0,0,0,1)]"
                        >
                        {letter}
                    </span>
                ))}
                </div>
                <p className="font-outfit text-[1rem] text-nbaOrange italic drop-shadow-[2px_3px_0px_rgba(0,0,0,1)]">
                    Vote for your player. Make every point count.
                </p>
            </div>

        </motion.section>
    )
}

export default Home