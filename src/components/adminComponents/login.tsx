import { useState, useContext } from "react"
import FetchDataContext from "../../context/fetchDataContext";
import { useNavigate } from "react-router-dom";
import type { AdminAcc } from "../../types/models";
import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';

import ShowToast from "../../utils/showToast";
const Login = () => {
    const navigate = useNavigate()
    const { adminList } = useContext(FetchDataContext)
    const [ admin, setAdmin ] = useState<AdminAcc>({
        username: "",
        password: ""
    })
    const [ showPass, setShowPass ] = useState<Boolean>(false)
    const [loginError, setLoginError] = useState<Boolean>(false);
    const { Toast } = ShowToast()

    const accInfo = adminList.data.find(key => key)
    if(!accInfo) return


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, username: string, password: string) => {
        e.preventDefault()
        if(accInfo.username === username && accInfo.password === password){
            Toast("success", "Login successful!", 2000)
            setTimeout(() => {
                navigate(`/adminmain/${username}`)
            }, 600)
        }
        else{
            setLoginError(true)
        }
        
    }

    return(
        <div className="flex items-center justify-center flex-col bg-nbaOrange w-[90%] sm:w-[50%] md:w-[60%] lg:w-[45%] xl:w-[30%] p-3 h-auto rounded-[10px] shadow-lg border border-black">
            <h3 className="font-bebas tracking-wider text-black text-[1.80rem] font-semibold">
                Admin
            </h3>
            <form 
                onSubmit={(e) => handleSubmit(e, admin.username, admin.password)}
                className="flex items-center justify-center flex-col  w-full h-full mt-[1rem]"
            >
                <div className="relative w-full bg-nbaOrange rounded mb-[1.50rem]">
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder=" "
                        value={admin.username}
                        onChange={(e) => setAdmin(prev => (
                            {
                                ...prev, [e.target.name]: e.target.value
                            }
                        ))}
                        onFocus={() => setLoginError(false)}
                        className="peer w-full p-3 rounded bg-nbaOrange border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm"
                    />
                    <label
                        htmlFor="username"
                        className={`absolute left-3 text-gray-900 transition-all duration-200 pointer-events-none 
                        ${admin.username
                            ? "-top-2 text-sm text-gray-900 bg-nbaOrange px-1"
                            : "top-3 peer-placeholder-shown:text-gray-900 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-gray-900 bg-nbaOrange px-1"
                        }`}
                    >
                        username
                    </label>
                </div>
                <div className="relative w-full bg-nbaOrange rounded">
                    <input
                        id="password"
                        type={showPass ? "text" : "password"}
                        name="password"
                        placeholder=" "
                        value={admin.password}
                        onChange={(e) => setAdmin(prev => (
                            {
                                ...prev, [e.target.name]: e.target.value
                            }
                        ))}
                        onFocus={() => setLoginError(false)}
                        className="peer w-full p-3 rounded bg-nbaOrange border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-sm"
                        
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass(prev => !prev)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1"
                    >
                        {showPass
                            ? <Eye size={16} color="black"/>
                            : <EyeClosed size={16} color="black"/>
                        }
                    </button>
                    <label
                        htmlFor="password"
                        className={`absolute left-3 text-gray-900 transition-all duration-200 pointer-events-none 
                        ${admin.password
                            ? "-top-2 text-sm text-gray-900 bg-nbaOrange px-1"
                            : "top-3 peer-placeholder-shown:text-gray-900 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-gray-900 bg-nbaOrange px-1"
                        }`}
                    >
                        password
                    </label>
                </div>
                <p className="w-full text-start mb-[1rem] p-1  text-[0.80rem] text-black">
                    {loginError && (
                        "Invalid username or password"
                    )}
                </p>
                <button 
                    type="submit"
                    className="font-outfit font-semibold tracking-wider text-black border-2 border-black px-6 py-3 rounded
                    transition-all duration-200 hoverable:hover:text-white hoverable:hover:border-white"
                >
                    LOG IN
                </button>
            </form>
        </div>
    )
}

export default Login