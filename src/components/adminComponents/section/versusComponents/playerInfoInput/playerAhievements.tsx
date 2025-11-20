import { useContext } from 'react';
import ModalContext from '../../../../../context/modalContext';
import { ModalKey } from '../../../../../types/models';
import PlayerInputLayout from '../../../../playerInputLayout';

interface PlayerAchievementsProps {
    player: string
}

const PlayerAchievements = ({player}: PlayerAchievementsProps) => {
    const { setSelectedModal, toggleModal } = useContext(ModalContext)

    const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>, modal: ModalKey) => {
        e.preventDefault()
        sessionStorage.setItem("saveTo", player)
        setSelectedModal(modal)
        toggleModal()
    }

    return(
        <PlayerInputLayout
            title="Achievements"
            selectedModal="achievements"
            handleOpenModal={handleOpenModal}
        />
    )
}

export default PlayerAchievements