import { useState, useEffect } from "react";
import axios from "axios";


const useAxiosFetch = <T>(dataUrl: string)=> {
    const [data, setData] = useState<T[]>([])
    const [fetchError, setFetchError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const Loading = () => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }

    useEffect(() => {
        let isMounted = true
        const source = axios.CancelToken.source()

        const fetchData = async (dataUrl: string) => {
            setIsLoading(true);
            try{
                const response = await axios.get<T[]>(dataUrl, {
                    cancelToken: source.token
                })
                if(isMounted){
                    setData(response.data)
                    setFetchError(null)
                    
                }
            } catch (err:unknown) {
                if(isMounted){
                    if(err instanceof Error) {
                        setFetchError(err)
                    } 
                    else{
                        setFetchError(new Error("Unknown error occurred"))
                    }
                    setData([])
                }
            }  finally{
                isMounted && Loading()
            }
        }

        fetchData(dataUrl)

        const cleanUp = () => {
            isMounted = false
            source.cancel()
        }
        return cleanUp
    }, [dataUrl])

    return{ data, fetchError, isLoading, setIsLoading }
}

export default useAxiosFetch