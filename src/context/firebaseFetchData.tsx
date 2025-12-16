import { createContext, useState, useCallback, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import type { Props } from "../types/models";
import type { DataList } from "../types/models";
import type { Admin } from "../types/models";
import type { Matchup } from "../types/models";

interface FireBaseFetchDataContextType {
    adminList: DataList<Admin>,
    matchupList: DataList<Matchup<any>>,
    setMatchupList: React.Dispatch<React.SetStateAction<DataList<Matchup<any>>>>,
    isError: boolean,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultValue : FireBaseFetchDataContextType = {
    adminList: { data: [] },
    matchupList: { data: [] },
    setMatchupList: () => {},
    isError: false,
    setIsError: () => {}

}

const FireBaseFetchDataContext = createContext<FireBaseFetchDataContextType>(defaultValue)

export const FireBaseFetchDataProvider = ({ children }: Props) => {
    const [ adminList, setAdminList ] = useState<DataList<Admin>>({
        data: []
    })
    const [ matchupList, setMatchupList ] = useState<DataList<Matchup<any>>>({
        data: []
    })

    const [ isError, setIsError ] = useState<boolean>(false)

    const subscribeNode = useCallback(<T,>(nodeName: string, setter: (value: T[]) => void) => {
        const dbRef = ref(database, nodeName);

        return onValue(dbRef, snapshot => {
            const data = snapshot.val()
            const arr = data
                ? Object.keys(data).map(key => ({
                    firebaseKey: key,
                    ...data[key],
                }))
                : []
            setter(arr)
            },
            (error) => {
                setIsError(true)
                console.error(`[Firebase] ${nodeName} fetch failed:`, error)
                setter([])
            })
        },[]
    )

    useEffect(() => {
        const unsubAdmins = subscribeNode<Admin>("admins", (arr) =>
            setAdminList({ data: arr })
        )

        const unsubMatchups = subscribeNode<Matchup<any>>(
            "matchups",
            (arr) => setMatchupList({ data: arr })
        )

        return () => {
            unsubAdmins()
            unsubMatchups()
        }
    }, [])

    return (
        <FireBaseFetchDataContext.Provider
            value={{
                adminList,
                matchupList,
                setMatchupList,
                isError,
                setIsError
            }}
        >
            {children}
        </FireBaseFetchDataContext.Provider>
    )

}

export default FireBaseFetchDataContext
