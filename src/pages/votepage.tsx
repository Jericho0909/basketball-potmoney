import { useContext, useState, useRef, useEffect } from "react";
import Notification from "../components/notification";
import Header from "../components/header";
import Navbar from "../components/nav";
import Modal from "../components/modal";
import Main from "../components/main";
import Footer from "../components/footer";
import Home from "../components/votespageComponents/section/home";
import Votes from "../components/votespageComponents/section/vote";
import Rules from "../components/votespageComponents/section/rules";
import Contact from "../components/votespageComponents/section/contact";
import Vote from "../components/votespageComponents/votesModal/vote";
import ModalContext from "../context/modalContext";
import WindowSizeContext from "../context/windowsizeContext";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { SquareMenu } from 'lucide-react';
import type { ModalKey2 } from "../types/models";
import ShootingOne from "../assets/image/shooting-motion1.jpg"
import ShootingTwo from "../assets/image/shooting-motion2.jpg"
import ShootingThree from "../assets/image/shooting-motion3.jpg"
const VotePage = () => {
    const { isOpen, selectedModal2 } = useContext(ModalContext)
    const { isMobile } = useContext(WindowSizeContext)
    const [ isDropDownOpen, setIsDropDownOpen ] = useState<boolean>(false)
    const [ activeSection, setActiveSection ] = useState<string>("home")
    const [ delay, setDelay ] = useState<boolean>(true)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const modalComponents: Record<Exclude<ModalKey2, "">, React.ReactNode> = {
        vote: <Vote/>
    }

    const modalStyles : Record<Exclude<ModalKey2, "">, string> = {
        vote: "flex items-center justify-start flex-col w-[100%] sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[60%] min-h-[35%] sm:min-h-[35%] p-1"
    }

    const scrollToSection = (id: string) => {
        const sectionId = document.getElementById(id)
        if(sectionId){
            sectionId.scrollIntoView({behavior: 'smooth', block: 'start'});
            window.location.hash = id
        }
    }

    const NavbarContent = () => {
        return(
            <ul 
                className={`flex items-center justify-between p-1 w-auto h-auto
                    ${isMobile ? "flex-col gap-1" : ""}
                `}
            >
                <li 
                    className={`relative font-bebas tracking-wide text-[clamp(1rem,2vw,1.50rem)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 cursor-pointer 
                    ${
                        activeSection === "home" ? "font-bold text-nbaOrange after:w-full" : "hoverable:hover:after:w-full"
                    }`}
                    onClick={() => {
                        scrollToSection("home")
                        setIsDropDownOpen(false)
                    }}
                >
                    Home
                </li>
                <li 
                    className={`relative font-bebas tracking-wide text-[clamp(1rem,2vw,1.50rem)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 cursor-pointer 
                    ${
                        activeSection === "votes" ? "font-bold text-nbaOrange after:w-full" : "hoverable:hover:after:w-full"
                    }`}
                    onClick={() => {
                        scrollToSection("votes")
                        setIsDropDownOpen(false)
                    }}
                >
                    Votes
                </li>
                <li 
                   className={`relative font-bebas tracking-wide text-[clamp(1rem,2vw,1.50rem)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 cursor-pointer 
                    ${
                        activeSection === "rules" ? "font-bold text-nbaOrange after:w-full" : "hoverable:hover:after:w-full"
                    }`}
                    onClick={() => {
                        scrollToSection("rules")
                        setIsDropDownOpen(false)
                    }}
                >
                    Rules
                </li>
                <li 
                    className={`relative font-bebas tracking-wide text-[clamp(1rem,2vw,1.50rem)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 cursor-pointer 
                    ${
                        activeSection === "contact" ? "font-bold text-nbaOrange after:w-full" : "hoverable:hover:after:w-full"
                    }`}
                    onClick={() => {
                        scrollToSection("contact")
                        setIsDropDownOpen(false)
                    }}
                >
                    Contact
                </li>
            </ul>
        )
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if(wrapperRef.current && !wrapperRef.current.contains(event.target as Node)){
                setIsDropDownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelay(false)
        }, 150)

        return () => clearTimeout(timer)
    }, [])

    if(delay){
        return null
    }

    return(
        <>
            <Notification/>
            <Header title="Plat4Pot">
                {isMobile
                    ? (
                        <div 
                            className="relative"
                            ref={wrapperRef}
                        > 
                            <div 
                                className="p-1 rounded-md cursor-pointer transition hover:bg-nbaOrange"
                                onClick={() => setIsDropDownOpen(prev => !prev)}
                            >
                                <SquareMenu size={26} strokeWidth={2} />
                            </div>
                            <AnimatePresence>
                                {isDropDownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.18, ease: "easeOut" }}
                                        className="absolute top-full -right-1 mt-2 w-[10rem] h-auto p-2 bg-white shadow-lg rounded-md"
                                    >
                                        <NavbarContent/>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                    : (
                        <Navbar style="w-[19rem] p-1">
                            <NavbarContent/>
                        </Navbar>
                    )
                }
            </Header>
            <AnimatePresence>
                {isOpen && (
                    <Modal 
                        style={selectedModal2 ? modalStyles[selectedModal2] : ""}
                    >
                        {selectedModal2 !== "" && modalComponents[selectedModal2]}
                    </Modal>
                )}
            </AnimatePresence>
            <Main style="flex items-center justify-start flex-col w-full min-h-[80svh] mt-[6rem] z-1">
                <Home
                    setActiveSection={setActiveSection}
                />
                <div className="my-12">
                    <img
                        src={ShootingOne}
                        alt="ShootingMotionOne"
                        className="w-auto h-[18rem]"
                        loading="lazy"
                    />
                </div>
                <Votes
                    setActiveSection={setActiveSection}
                />
                <div className="my-12">
                    <img
                        src={ShootingTwo}
                        alt="ShootingMotionOne"
                        className="w-auto h-[18rem]"
                        loading="lazy"
                    />
                </div>
                <Rules
                    setActiveSection={setActiveSection}
                />
                <div className="my-12">
                    <img
                        src={ShootingThree}
                        alt="ShootingMotionOne"
                        className="w-auto h-[18rem]"
                        loading="lazy"

                    />
                </div>
                <Contact
                    setActiveSection={setActiveSection}
                />
            </Main>
            <Footer/>
        </>
    )
}

export default VotePage