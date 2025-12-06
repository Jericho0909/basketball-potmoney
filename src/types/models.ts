import { ReactNode } from "react";

export interface Props {
    children: ReactNode;
}

export interface Player <T> {
    image: string | null
    fullname: string,
    team: string,
    jerseynumber: number,
    champoinrings: number,
    achievements: T[],
    pictures: T[],
    highlights: T[]
    votes: VoteType[]
}

export interface PlayerFormProps<T> {
    playerDetails: Player<T>
    setPlayerDetails: React.Dispatch<React.SetStateAction<Player<T>>>
}

export interface VersusType{
    id: string,
    playerOne: Player<any>,
    playerTwo: Player<any>,
    location: string,
    time: string,
    date: string,
    money: number,
    winner: string,
    totalVotes: number
}

export interface DataList<T> {
    data: T[]
}


export interface Matchup<T> {
    id: string
    playerOne: Player<T>,
    playerTwo: Player<T>,
    location: string,
    money: number,
    time: string,
    date: string,
    winner: string,
    totalVotes: number

}

export interface TableHeaderType {
    label: string,
    key: string
}

export interface VoteType {
    id: string,
    fullname: string,
    gcashnumber: number,
    bet: number
    claimed: boolean,
    betOn: string
}

export type ModalKey = "" | "achievements" | "pictures" | "highlights" | "matchup" | "matchupdetails";

export type ModalKey2 = "" | "vote"

export interface AdminAcc {
  username: string;
  password: string;
}
