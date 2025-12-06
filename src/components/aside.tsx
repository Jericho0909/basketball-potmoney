import Navbar from "./nav";
import { ReactNode } from "react";


interface AsideProps {
    style: string
    children: ReactNode
}

const Aside = ({ style, children }: AsideProps) => {
    return (
        <Navbar style={`w-full ${style}`}>
            {children}
        </Navbar>
    )
}

export default Aside;
