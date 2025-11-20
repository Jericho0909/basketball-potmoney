import { useContext } from "react"
import Modal from "../components/modal"
import Header from "../components/header"
import Main from "../components/main"
import ModalContext from "../context/modalContext"
import AddAchievements from "../components/adminComponents/section/versusComponents/versusModal/addAchievements"
import AddPictures from "../components/adminComponents/section/versusComponents/versusModal/addPictures"
import AddHighlights from "../components/adminComponents/section/versusComponents/versusModal/addHighlights"
import { AnimatePresence } from "framer-motion"
import type { ModalKey } from "../types/models"
const AdminMainPage = () => {
    const { isOpen, selectedModal } = useContext(ModalContext)

    const modalComponents: Record<Exclude<ModalKey, "">, React.ReactNode> = {
        achievements: <AddAchievements/>,
        pictures: <AddPictures/>,
        highlights: <AddHighlights/>
    }
    return(
        <>  
            <Header title="Admin">
                <div>
                    Hamburger Menu
                </div>
            </Header>
            <Main/>
            <AnimatePresence>
                {isOpen && (
                    <Modal style={"flex items-center justify-start flex-col w-[34%] min-h-[30%] p-1"}>
                        {selectedModal !== "" && modalComponents[selectedModal]}
                    </Modal>
                )}
            </AnimatePresence>
        </>
    )
}

export default AdminMainPage