import { ReactNode } from "react";

export interface Props {
    children: ReactNode;
}

export interface Player <T> {
    image: string
    fullname: string,
    team: string,
    jerseynumber: number,
    champoinrings: number,
    achievements: T[],
    pictures: T[],
    highlights: T[]
}

export interface PlayerFormProps<T> {
    playerDetails: Player<T>
    setPlayerDetails: React.Dispatch<React.SetStateAction<Player<T>>>
}

export type ModalKey = "" | "achievements" | "pictures" | "highlights";

export interface AdminAcc {
  username: string;
  password: string;
}
