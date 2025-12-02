import type { ModalKey } from "../types/models"
import { Plus } from 'lucide-react';
interface PlayerInputLayoutProps {
    title: string,
    selectedModal: ModalKey
    handleOpenModal: (e: React.MouseEvent<HTMLButtonElement>, modal: ModalKey) => void
}

const PlayerInputLayout = ({title, selectedModal, handleOpenModal}: PlayerInputLayoutProps) => {
    return(
        <div className="flex items-center justify-start gap-1 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[65%] xl:w-[55%] p-1 mb-1">
            <span className="w-[15rem] text-end font-outfit">
                {title}
            </span>
            <button
                onClick={(e) => handleOpenModal(e, selectedModal)}
                className="w-full"
            >
                <Plus 
                    size={16} 
                    color="black"
                    strokeWidth={4}
                />
            </button>
        </div>
    )
}

export default PlayerInputLayout