import { createContext } from "react";
import { ThenableReference } from "firebase/database";
import useFirebaseAction from "../hooks/useFirebaseAction";
import type { Props } from "../types/models";
import type { Matchup } from "../types/models";

interface FirebaseActionContextType {
    pushAction: (endpoint: string, newData: Matchup<any>) => Promise<{
    newRef: ThenableReference} | null>
    updateAction: (endpoint: string, id: string, updatedData: Matchup<any>) => Promise<void>
    removeAction: (endpoint: string, id: string) => Promise<void>
}

const defaultValue = {
    pushAction:  async () => null,
    updateAction: async () => {},
    removeAction: async () => {}
}

const FirebaseActionContext = createContext<FirebaseActionContextType>(defaultValue)


export const FirebaseActionProvider = ({children}: Props ) => {
    const { pushAction, updateAction, removeAction } = useFirebaseAction()
    return (
        <FirebaseActionContext.Provider
            value={{
                pushAction,
                updateAction,
                removeAction
            }}
        >
            {children}
        </FirebaseActionContext.Provider>
    )
}

export default FirebaseActionContext