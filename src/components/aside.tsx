import { NavLink, useNavigate } from "react-router-dom";

const Aside = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate(`/admin`)
    }

    return (
        <nav 
            className="w-full mt-[4rem]"
        >
            <ul className="flex items-center justify-start flex-col">
                <li
                    className="w-full text-center py-2 rounded-lg hoverable:hover:bg-white/20 transition-colors duration-200 font-outfit text-white text-[1.30rem] font-semibold cursor-pointer"
                >
                    <NavLink
                        to={"Versus"}
                        className={({ isActive }) =>
                        `block w-full  py-2 rounded-lg 
                            ${isActive 
                                ? "bg-black text-white font-semibold" 
                                : ""
                            }`
                        }
                    >
                        VERSUS
                    </NavLink>
                </li>
                <li
                    className="w-full text-center py-2 rounded-lg hoverable:hover:bg-white/20 transition-colors duration-200 font-outfit text-white text-[1.30rem] font-semibold cursor-pointer"
                >
                    <NavLink
                        to={"Matches"}
                        className={({ isActive }) =>
                        `block w-full  py-2 rounded-lg
                            ${isActive 
                                ? "bg-black text-white font-semibold" 
                                : ""
                            }`
                        }
                    >
                        MATCHES
                    </NavLink>
                </li>
                <li className="mt-[1rem]">
                    <button 
                        type="button"
                        onClick={() => handleLogout()}
                        className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-6 py-3 rounded
                        transition-all duration-200 hoverable:hover:text-white hoverable:hover:border-white"
                    >
                        LOG IN
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Aside;
