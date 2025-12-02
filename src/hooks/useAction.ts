import DbApi from "../api/api";
import type { VersusType } from "../types/models";
const useAction = () => {
    const addAction = async (endpoint: string, newData: VersusType) => {
        try {
            const response = await DbApi.post(`/${endpoint}`, newData)
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                console.error("Add failed:", error.message)
            } else {
                console.error("Add failed:", error)
            }
            return null
        }
    }

    const patchAction = async (endpoint: string, id: string | number, updatedData: VersusType) => {
        try {
            const response = await DbApi.patch(`${endpoint}/${id}`, updatedData)
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                console.error("Add failed:", error.message)
            } else {
                console.error("Add failed:", error)
            }
            return null
        }
    }

    const deleteAction  = async (endpoint: string, id: string | number) => {
        try {
            const response = await DbApi.delete(`/${endpoint}/${id}`)
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                console.error("Add failed:", error.message)
            } else {
                console.error("Add failed:", error)
            }
            return null
        }
    }

    return {
        addAction,
        patchAction,
        deleteAction
    }
}

export default useAction