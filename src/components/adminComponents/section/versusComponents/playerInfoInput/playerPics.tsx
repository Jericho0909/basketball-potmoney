import { useContext } from "react"
import ModalContext from "../../../../../context/modalContext"
import { ModalKey } from "../../../../../types/models"
import PlayerInputLayout from "../../../../playerInputLayout"

interface PlayerPics {
    player: string
}

const PlayerPics = ({player}: PlayerPics) => {
    const { setSelectedModal, toggleModal } = useContext(ModalContext)

    const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>, modal: ModalKey) => {
        e.preventDefault()
        setSelectedModal(modal)
        sessionStorage.setItem("savetO", player)
        toggleModal()
    }
    return(
        <PlayerInputLayout
            title="Pictures"
            selectedModal="pictures"
            handleOpenModal={handleOpenModal}
        />
    )
}

export default PlayerPics