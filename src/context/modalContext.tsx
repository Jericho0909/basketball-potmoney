import { createContext } from "react";
import useModal from "../hooks/useModal";
import type { Props } from "../types/models";
import type { ModalKey } from "../types/models";
import type { ModalKey2 } from "../types/models";

interface ModalContextType {
    isOpen: boolean,
    selectedModal: ModalKey,
    setSelectedModal: React.Dispatch<React.SetStateAction<ModalKey>>,
    selectedModal2: ModalKey2,
    setSelectedModal2: React.Dispatch<React.SetStateAction<ModalKey2>>
    toggleModal: () => void
    
}

const defaultValue: ModalContextType = {
    isOpen: false,
    selectedModal: "",
    setSelectedModal: () => {},
    selectedModal2: "",
    setSelectedModal2: () => {},
    toggleModal: () => {},   
}

const ModalContext = createContext<ModalContextType>(defaultValue)
export const ModalProvider = ({ children }: Props) => {
    const { isOpen, selectedModal, setSelectedModal, selectedModal2, setSelectedModal2, toggleModal } = useModal() 

    return(
        <ModalContext.Provider
            value={{
                isOpen,
                selectedModal,
                setSelectedModal,
                selectedModal2,
                setSelectedModal2,
                toggleModal
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext

