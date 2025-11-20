import { Outlet } from "react-router-dom";
const Main = () => {
    return(
        <div className="w-full min-h-[80svh] mt-[1rem]">
            <Outlet/>
        </div>
    )
}

export default Main