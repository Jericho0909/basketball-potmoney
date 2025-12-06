import Ball from "../assets/image/ball.webp"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
    return(
        <div className="flex items-center justify-between w-full p-1 border-t border-t-black">
            <div className="w-auto p-1">
                <img
                    src={Ball}
                    alt="BasketBall-Ball"
                    className="w-[4rem] h-[4rem]"
                    loading="lazy"
                />
            </div>
            <div className="w-auto p-1">
                <p className="text-xs">Email: support@playpot.com</p>
                <p className="text-xs">
                    © 2025 PlayPot. All rights reserved.
                </p>
            </div>
            <div className="flex items-start justify-center flex-col w-auto p-1">
                <div className="flex items-center justify-center p-1 gap-1">
                    <FontAwesomeIcon 
                        icon={faFacebook} 
                        className="text-blue-600 text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl"
                    />
                    <span className="text-xs">
                        Play4Pot
                    </span>
                </div>
                <div className="flex items-center justify-center p-1 gap-1">
                    <FontAwesomeIcon 
                        icon={faInstagram} 
                        className="text-pink-500 text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-2xl"
                    />
                    <span className="text-xs">
                        _._Play4Pot
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer