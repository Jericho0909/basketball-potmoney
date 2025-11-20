import { createContext, useState, useEffect } from "react";
import type { Props } from "../types/models"
import useAxiosFetch from "../hooks/useFetchData";

interface FetchDataContextType<T> {
    adminData: T[];
    adminList: DataList<T>;
    isLoading: boolean;
    fetchError: Error | null;
}

interface Admin {
    id: number;
    username: string;
    password: string
}

interface DataList<T> {
    data: T[]
}

const defaultValue: FetchDataContextType<any> = {
    adminData: [],
    adminList: { data: [] },
    isLoading: false,
    fetchError: null,
}

const FetchDataContext = createContext<FetchDataContextType<any>>(defaultValue)

export const FetchDataProvider = ({ children }: Props) => {
    const [ adminList, setAdminList ] = useState<DataList<Admin>>({
        data: []
    })
    const { data: adminData, isLoading, fetchError } = useAxiosFetch<any>("http://localhost:3500/admin");

    useEffect(() => {
        setAdminList({ data: adminData });
    }, [adminData])

    return (
        <FetchDataContext.Provider value={{ 
            adminData,
            adminList,
            isLoading, 
            fetchError,

        }}>
            {children} 
        </FetchDataContext.Provider>
    )
}

export default FetchDataContext;
