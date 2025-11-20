import { useState } from "react"
import type { ModalKey } from "../types/models"
const useModal = () => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ selectedModal, setSelectedModal ] = useState<ModalKey>("")

    const toggleModal = () => setIsOpen(prev => !prev) 

    return{
        isOpen,
        selectedModal,
        setSelectedModal,
        toggleModal
    }
}

export default useModal