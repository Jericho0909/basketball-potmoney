import { Outlet } from "react-router-dom";
const Main = () => {
    return(
        <div className="flex items-center justify-center w-full min-h-[80svh] mt-[6rem] lg:pl-[13.50rem] z-1">
            <Outlet/>
        </div>
    )
}

export default Main