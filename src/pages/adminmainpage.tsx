import { useContext, useState } from "react"
import Modal from "../components/modal"
import Header from "../components/header"
import Aside from "../components/aside"
import Main from "../components/main"
import ModalContext from "../context/modalContext"
import WindowSizeContext from "../context/windowsizeContext"
import AddAchievements from "../components/adminComponents/section/versusComponents/versusModal/addAchievements"
import AddPictures from "../components/adminComponents/section/versusComponents/versusModal/addPictures"
import AddHighlights from "../components/adminComponents/section/versusComponents/versusModal/addHighlights"
import MatchUp from "../components/adminComponents/section/versusComponents/versusModal/matchUp"
import MatchUpDetails from "../components/adminComponents/section/matchesComponents/matchesModal/matchupDetails"
import Notification from "../components/notification"
import { AnimatePresence } from "framer-motion"
import type { ModalKey } from "../types/models"
import { Menu } from 'lucide-react';
import { motion } from "framer-motion";
const AdminMainPage = () => {
    const { isOpen, selectedModal } = useContext(ModalContext)
    const { isMobile } = useContext(WindowSizeContext)
    const [ isSideBarOpen, setIsSideBarOpen ] = useState<boolean>(false)

    const modalComponents: Record<Exclude<ModalKey, "">, React.ReactNode> = {
        achievements: <AddAchievements />,
        pictures: <AddPictures/>,
        highlights: <AddHighlights/>,
        matchup: <MatchUp/>,
        matchupdetails: <MatchUpDetails/>
    }

    const modalStyles: Record<Exclude<ModalKey, "">, string> = {
        achievements: "flex items-center justify-center flex-col w-[95%] sm:w-[55%] md:w-[50%] lg:w-[44%] xl:w-[30%] min-h-[35%] sm:min-h-[35%] p-1",
        pictures: "flex items-center justify-center flex-col w-[95%] sm:w-[55%] md:w-[50%] lg:w-[44%] xl:w-[34%] min-h-[35%] sm:min-h-[33%] xl:min-h-[35%] p-1",
        highlights: "flex items-center justify-center flex-col w-[95%] sm:w-[55%] md:w-[50%] lg:w-[44%] xl:w-[34%] min-h-[35%] sm:min-h-[33%] xl:min-h-[35%] p-1",
        matchup: "flex items-center justify-center flex-col w-[95%] sm:w-[55%] md:w-[50%] lg:w-[44%] xl:w-[34%] min-h-[35%] sm:min-h-[33%] xl:min-h-[35%] p-1",
        matchupdetails: "flex items-center justify-start flex-col w-[100%] sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[75%] min-h-[35%] sm:min-h-[35%] p-1"
    }

    const toggleSidebar = () => {
        setIsSideBarOpen((prev) => (!prev))
    }

    return(
        <>  
            <div className="flex flex-col">
                <Notification/>
                <Header title="Admin">
                    {isMobile && (
                        <div className="flex items-center w-auto h-auto p-1">
                            <button
                                type="button"
                                onClick={() => toggleSidebar()}
                                className="cursor-pointer"
                            >
                                <Menu size={25}/>
                            </button>
                        </div>
                    )}
                </Header>
                <div className="flex">
                    {isMobile
                        ? (
                            <AnimatePresence>
                                <motion.aside
                                    initial={{ x: "-100%" }} 
                                    animate={{ x: isSideBarOpen ? 0 : "-100%" }} 
                                    exit={{ x: "-100%" }}
                                    transition={{ type: "tween", duration: 0.3 }}
                                    className="fixed top-[5.60rem] left-0 w-full md:w-[25%] h-full bg-nbaOrange shadow-md z-50"
                                >
                                    <Aside/>
                            </motion.aside>
                            </AnimatePresence>
                        )
                        : (
                            <aside
                                className="fixed top-[5.60rem] bottom-0 bg-nbaOrange w-[13rem] shadow-md p-1 mr-1"
                            >
                                <Aside />
                            </aside>
                        )
                    }
                    <Main/>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <Modal style={selectedModal ? modalStyles[selectedModal] : ""}>
                            {selectedModal !== "" && modalComponents[selectedModal]}
                        </Modal>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

export default AdminMainPage