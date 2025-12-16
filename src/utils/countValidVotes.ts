import type { VoteType } from "../types/models";
export default function countValidVotes (arr: VoteType[]): number {
    const votes = arr.reduce((count, vote) => vote.id !== "__empty__" ? count + 1 : count,
    0)

    return votes
}