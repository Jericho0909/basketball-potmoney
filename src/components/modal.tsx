import { ReactNode, useContext, useEffect } from 'react';
import ModalContext from '../context/modalContext';
import { motion } from "framer-motion";
import { X } from 'lucide-react';

interface ModalProps {
    style: string;
    children: ReactNode;
}

const Modal = ({ style, children }: ModalProps) => {
    const { isOpen, toggleModal } = useContext(ModalContext);

    useEffect(() => {
            if(isOpen) {
                document.documentElement.style.overflow = "hidden"
                document.body.style.overflow = "hidden"
            } 
            else{
                document.documentElement.style.overflow = ""
                document.body.style.overflow = ""
            }

            return () => {
                document.documentElement.style.overflow = ""
                document.body.style.overflow = ""
            }
        }, [isOpen])

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className={`relative bg-nbaOrange rounded-md shadow-lg ${style}`}
            >
                <button
                    className="absolute top-2 right-2"
                    onClick={toggleModal}
                >
                    <X size={16} color="black" strokeWidth={3} />
                </button>
                {children}
            </motion.div>
        </div>
    )
}

export default Modal;
