import { ReactNode } from "react";

interface NavbarProps {
    style: string
    children: ReactNode
}

const Navbar = ({ style, children }: NavbarProps) => {
    return(
        <nav className={`${style}`}>
            {children}
        </nav>
    )
}

export default Navbar