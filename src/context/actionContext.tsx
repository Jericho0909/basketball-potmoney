import { createContext } from "react";
import useAction from "../hooks/useAction";
import type { Props, VersusType } from "../types/models";

interface ActionContextType {
    addAction: (endpoint: string, newData: VersusType) => Promise<any>;
    patchAction: (endpoint: string, id: string | number, updatedData:VersusType) => Promise<any>;
    deleteAction: (endpoint: string, id: string | number) => Promise<any>;
}

const defaultValue: ActionContextType = {
    addAction: async () => Promise.resolve(null),
    patchAction: async () => Promise.resolve(null),
    deleteAction: async () => Promise.resolve(null),
};

const ActionContext = createContext<ActionContextType>(defaultValue);

export const ActionProvider = ({ children }: Props) => {
    const { addAction, patchAction, deleteAction } = useAction();

    return (
        <ActionContext.Provider value={{ addAction, patchAction, deleteAction }}>
            {children}
        </ActionContext.Provider>
    );
};

export default ActionContext;
