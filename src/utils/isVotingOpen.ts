export default function isVotingOpen(date: string, time: string): boolean{
    const [year, month, day] = date.split("-").map(Number)
    const [hour, minute] = time.split(":").map(Number)
    const matchDateTime = new Date(year, month - 1, day, hour, minute, 0)
    const now = new Date()

    return now < matchDateTime
}