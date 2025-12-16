import { useState } from "react"
import type { ModalKey } from "../types/models"
import type { ModalKey2 } from "../types/models"
const useModal = () => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ selectedModal, setSelectedModal ] = useState<ModalKey>("")
    const [ selectedModal2, setSelectedModal2 ] = useState<ModalKey2>("")

    const toggleModal = () => setIsOpen(prev => !prev) 

    return{
        isOpen,
        selectedModal,
        setSelectedModal,
        selectedModal2,
        setSelectedModal2,
        toggleModal
    }
}

export default useModal