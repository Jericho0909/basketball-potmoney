import { createContext, useState, useEffect } from "react";
import type { Props } from "../types/models";
import type { DataList } from "../types/models";
import type { Matchup } from "../types/models";
import useAxiosFetch from "../hooks/useFetchData";

interface FetchDataContextType<T> {
    adminData: T[];
    adminList: DataList<T>;
    adminLoading: boolean;
    adminFetchError: Error | null;
    matchupData: T[];
    matchupList: DataList<T>;
    setMatchupList: React.Dispatch<React.SetStateAction<DataList<Matchup<any>>>>
    matchupLoading: boolean;
    matchupFetchError: Error | null;

}

interface Admin {
    id: string;
    username: string;
    password: string
}


const defaultValue: FetchDataContextType<any> = {
    adminData: [],
    adminList: { data: [] },
    adminLoading: false,
    adminFetchError: null,
    matchupData: [],
    matchupList: { data: [] },
    setMatchupList: () => {},
    matchupLoading: false,
    matchupFetchError: null,
}

const FetchDataContext = createContext<FetchDataContextType<any>>(defaultValue)

export const FetchDataProvider = ({ children }: Props) => {
    const [ adminList, setAdminList ] = useState<DataList<Admin>>({
        data: []
    })

    const [ matchupList, setMatchupList ] = useState<DataList<Matchup<any>>>({
        data: []
    })

    const { data: adminData, isLoading: adminLoading, fetchError:adminFetchError } = useAxiosFetch<any>("http://localhost:3500/admin")
    const { data: matchupData, isLoading: matchupLoading, fetchError: matchupFetchError } = useAxiosFetch<any>("http://localhost:3500/matchups")


    useEffect(() => {
        setAdminList({ data: adminData })
        setMatchupList({data: matchupData})
    }, [adminData, matchupData])

    return (
        <FetchDataContext.Provider value={{ 
            adminData,
            adminList,
            adminLoading, 
            adminFetchError,
            matchupData,
            matchupList,
            setMatchupList,
            matchupLoading, 
            matchupFetchError,

        }}>
            {children} 
        </FetchDataContext.Provider>
    )
}

export default FetchDataContext;
