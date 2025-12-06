import { useContext, useState, useRef, useEffect } from "react";
import Notification from "../components/notification";
import Header from "../components/header";
import Navbar from "../components/nav";
import Main from "../components/main";
import Footer from "../components/footer";
import Home from "../components/votespageComponents/section/home";
import Votes from "../components/votespageComponents/section/vote";
import Rules from "../components/votespageComponents/section/rules";
import Contact from "../components/votespageComponents/section/contact";
import WindowSizeContext from "../context/windowsizeContext";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { SquareMenu } from 'lucide-react';
import ShootingOne from "../assets/image/shooting-motion1.jpg"
import ShootingTwo from "../assets/image/shooting-motion2.jpg"
import ShootingThree from "../assets/image/shooting-motion3.jpg"
const VotePage = () => {
    const { isMobile } = useContext(WindowSizeContext)
    const [ isDropDownOpen, setIsDropDownOpen ] = useState<boolean>(false)
    const [ activeSection, setActiveSection ] = useState<string>("home")
    const [ delay, setDelay ] = useState<boolean>(true)
    const wrapperRef = useRef<HTMLDivElement | null>(null)


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
                    ${isDropDownOpen ? "flex-col gap-1" : ""}
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