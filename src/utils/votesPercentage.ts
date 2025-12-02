export default function votesPercentage(votesPlayer: number, totalVotes: number): string  {
    if (totalVotes === 0) return "0%"
    const percentage = (votesPlayer / totalVotes) * 100
    return `${percentage.toFixed(1)}%`
}