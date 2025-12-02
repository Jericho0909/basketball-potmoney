import { ReactNode } from "react";
import Ball from "../assets/image/ball.webp"
interface HeaderProps {
    title: string
    children: ReactNode
}
const Header = ({title, children} : HeaderProps) => {
    return(
        <div className="flex items-center justify-between w-full h-auto px-[1rem] fixed top-0 border border-black z-10 bg-white">
            <div className="flex items-center w-auto h-auto p-1">
                <div className="w-[5rem] h-[5rem] p-1">
                    <img
                    src={Ball}
                    alt="BasketBall-Ball"
                    className="w-full h-full"
                    loading="lazy"
                />
                </div>
                <div className="font-bebas tracking-wide font text-[clamp(1.50rem,2vw,2.50rem)]">
                    <span>
                        {title}
                    </span>
                </div>
            </div>
            {children} 
        </div>
    )
}

export default Header