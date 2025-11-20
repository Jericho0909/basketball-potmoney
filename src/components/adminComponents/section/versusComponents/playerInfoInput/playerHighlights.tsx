import { useContext } from "react"
import ModalContext from "../../../../../context/modalContext"
import { ModalKey } from "../../../../../types/models"
import PlayerInputLayout from "../../../../playerInputLayout"

interface PlayerHighlightsProps {
    player: string
}

const PlayerHighlights = ({player}: PlayerHighlightsProps) => {
    const { setSelectedModal, toggleModal } = useContext(ModalContext)

    const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>, modal: ModalKey) => {
        e.preventDefault()
        setSelectedModal(modal)
        sessionStorage.setItem("Saveto", player)
        toggleModal()
    }
    return (
        <PlayerInputLayout
            title="Highlights"
            selectedModal="highlights"
            handleOpenModal={handleOpenModal}
        />
    )
}

export default PlayerHighlights