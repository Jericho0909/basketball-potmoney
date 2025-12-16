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

export interface PlayerFirebase {
  image: string | null;
  fullname: string;
  team: string;
  jerseynumber: number;
  champoinrings: number;

  achievements?: Record<string, string>;
  pictures?: Record<string, string>;
  highlights?: Record<string, string>;

  votes?: Record<string, VoteType>;
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

export interface Admin {
    id: string;
    username: string;
    password: string
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

export type FirebaseEntity<T> = T & {
  firebaseKey: string;
}

export interface TableHeaderType {
    label: string,
    key: string
}

export interface VoteType {
    id: string,
    fullname: string,
    email: string
    gcashnumber: string,
    bet: number
    claimed: boolean,
    betOn: string
}

export type ModalKey = "" | "achievements" | "pictures" | "highlights" | "matchup" | "matchupdetails";

export type ModalKey2 = "" | "vote"

export type VoteKey = "" | "playerOneDetails" | "playerTwoDetails" | "bet"

export interface AdminAcc {
  username: string;
  password: string;
}
