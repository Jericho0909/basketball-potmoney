import { ref, push, update, remove } from "firebase/database"
import { database } from "../firebase"
import type { Matchup } from "../types/models"
const useFirebaseAction = () => {
    const pushAction = async(endpoint: string, newData: Matchup<any>) => {
        try {
            const dbRef = ref(database, endpoint)
            const newRef = push(dbRef, newData)
            return { newRef }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Add failed:", error.message)
            } else {
                console.error("Add failed:", error)
            }
            return null
        }
    }

    const updateAction = async(endpoint: string, id: string, updatedData: Matchup<any>) => {
        try {
            const dbRef = ref(database, `${endpoint}/${id}`)
            await update(dbRef, updatedData)
        } catch (error) {
            if (error instanceof Error) {
                console.error("Update failed:", error.message)
            } else {
                console.error("Update failed:", error)
            }
        }
    }

    const removeAction = async(endpoint: string, id: string) => {
        try {
            const dbRef = ref(database, `${endpoint}/${id}`)
            await remove(dbRef)
        } catch (error) {
            if (error instanceof Error) {
                console.error("Delete failed:", error.message)
            } else {
                console.error("Delete failed:", error)
            }
        }
    }

    return {
        pushAction,
        updateAction,
        removeAction
    }
}

export default useFirebaseAction