import { useContext, useEffect, useState } from "react"
import FetchDataContext from "../../../../../context/fetchDataContext"
import ModalContext from "../../../../../context/modalContext";
import Loading from "../../../../loading"
import Error from "../../../../error"
import ItemCard from "../../../../itemCard";
const Matches = () => {
    const { matchupList, matchupFetchError } = useContext(FetchDataContext)
    const { setSelectedModal, toggleModal } = useContext(ModalContext)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const reverseMatchup = [...matchupList.data].reverse()

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    if(isLoading) return <Loading/>

    if(matchupFetchError) return <Error/>

    const openMatchupDetails = (id: string) => {
        sessionStorage.setItem("matchupID", id)
        setSelectedModal("matchupdetails")
        toggleModal()
    }

    return(
        <section className="flex items-center justify-start flex-col w-full sm:w-[90%] xl:w-[85%] h-auto p-1">
            {reverseMatchup.map((match, index) => (
                <ItemCard
                    key={index}
                    match={match}
                    index={index}
                    openMatchupDetails={openMatchupDetails}
                />
            ))}
        </section>
    )
}

export default Matches