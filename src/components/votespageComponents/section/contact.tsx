import { useEffect, useState } from "react"
import useSectionInView from "../../../hooks/useViewSection"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import ShowToast from "../../../utils/showToast";


interface ContactProps {
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

const Contact = ({ setActiveSection }: ContactProps) => {
    const { ref, isVisible } = useSectionInView()
    const [ email, setEmail ] = useState<string>("")
    const [ message, setMessage ] = useState<string>("")
    const [ hasAnimated, setHasAnimated ] = useState<boolean>(false) 
    const { Toast } = ShowToast()

    useEffect(() => {
        if(isVisible){
            setActiveSection("contact")
            setHasAnimated(true)
            history.replaceState(null, "", "#contact")
        }
    }, [isVisible])

    const handleSubmit = () => {
        Toast("success", "Thanks for reaching out! Your message has been sent.", 2000)
        setEmail("")
        setMessage("")
    } 

    return(
        <motion.section
            ref={ref}
            id="contact"
            initial={{ opacity: 0 }}
            animate={hasAnimated ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="flex items-center justify-start flex-col w-[100%] sm:w-[95%] md:w-[75%] lg:w-[60%] min-h-[50svh] xl:w-[50%] p-1 scroll-mt-[10rem] mb-[1rem]"
        >
            <span className="font-bebas font-semibold tracking-wide text-[clamp(1.50rem,3vw,2.50rem)] text-nbaOrange">
                CONTACT
            </span>
            <div className="flex items-center justify-start flex-col w-full h-auto p-2 border border-black bg-nbaOrange rounded-md shadow-lg">
                <form 
                    className="flex items-center justify-start flex-col w-full h-auto p-2"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                >
                    <div 
                        className="relative w-[95%] bg-nbaOrange rounded mb-[1.50rem]"
                    >
                        <input
                            id="email"
                            type="email"
                            placeholder=""
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer w-full p-3 rounded bg-nbaOrange border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm"
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-3 text-gray-900 transition-all duration-200 pointer-events-none 
                        ${email
                            ? "-top-2 text-sm text-gray-900 bg-nbaOrange px-1"
                            : "top-3 peer-placeholder-shown:text-gray-900 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-gray-900 bg-nbaOrange px-1"
                        }`}
                        >
                            Gmail
                        </label>
                    </div>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-[95%] h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none mb-[1rem]"
                        required
                    />
                    <button 
                        type="submit"
                        className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-6 py-3 rounded
                        transition-all duration-200 
                        hover:hover:text-white hoverable:hover:border-white"
                    >
                        SUBMIT
                    </button>
                </form>
                <div className="flex items-center justify-between w-full h-auto p-1 mb-1">
                    <a 
                        href="https://www.facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center flex-col p-1 cursor-pointer"
                    >
                        <FontAwesomeIcon 
                            icon={faFacebook} 
                            className="text-blue-600 text-2xl"
                        />
                        <span className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                            Facebook/Play4Pot.com
                        </span>
                    </a>
                    <a 
                        href="https://www.instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center flex-col p-1 cursor-pointer"
                    >
                        <FontAwesomeIcon 
                            icon={faInstagram} 
                            className="text-pink-500 text-2xl"
                        />
                        <span className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                            Instagram/Play4Pot.com
                        </span>
                    </a>
                </div>
                <p className="font-outfit  text-[clamp(0.85rem,3vw,1rem)] italic">
                    For inquiries, issues, or suggestions regarding the voting system or game schedules, feel free to reach out.
                </p>
            </div>

        </motion.section>
    )
}

export default Contact