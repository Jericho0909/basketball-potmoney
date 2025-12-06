import { ReactNode } from "react";

interface MainProps {
    style: string
    children: ReactNode
}

const Main = ({ style, children } :MainProps) => {
    return(
        <div className={`${style}`}>
            {children}
        </div>
    )
}

export default Main