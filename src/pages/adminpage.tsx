import Login from "../components/adminComponents/login"
import Notification from "../components/notification"
const Adminpage = () => {
    return(
        <>
            <Notification/>
            <div className="flex items-center justify-center flex-col w-full h-[100svh]">
                <Login/>
            </div>
        </>
    )
}

export default Adminpage