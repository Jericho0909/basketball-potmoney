import { useContext, useEffect, useState } from "react"
import FireBaseFetchDataContext from "../../../../../context/firebaseFetchData";
import ModalContext from "../../../../../context/modalContext";
import type { Matchup } from "../../../../../types/models";
import type { FirebaseEntity } from "../../../../../types/models";
import Loading from "../../../../loading"
import Error from "../../../../error"
import ItemCard from "../../../../itemCard";
const Matches = () => {
    const { matchupList, isError } = useContext(FireBaseFetchDataContext)
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

    if(isError) return <Error/>

    const openMatchupDetails = (id: string) => {
        sessionStorage.setItem("matchupID", id)
        setSelectedModal("matchupdetails")
        toggleModal()
    }

    return(
        <section className="flex items-center justify-start flex-col w-full sm:w-[90%] xl:w-[85%] h-auto p-1">
            {reverseMatchup.length === 0
                ? (
                    <p className="font-outfit font-semibold text-[clamp(0.85rem,3vw,1rem)]">
                        There are no scheduled games.
                    </p>
                )
                : (
                    reverseMatchup.map((match, index) => (
                        <ItemCard
                            key={index}
                            openTo="Adminmainpage"
                            match={match as FirebaseEntity<Matchup<any>>}
                            index={index}
                            openModal={openMatchupDetails}
                        />
                    ))
                )
            }
        </section>
    )
}

export default Matches