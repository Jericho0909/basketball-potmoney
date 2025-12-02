export default function compareDate(date: string): string {
    const today = new Date()
    const target = new Date(date)

    today.setHours(0, 0, 0, 0)
    target.setHours(0, 0, 0, 0)

    if (target > today) return "Upcoming Match"
    if (target < today) return "Ended"

    return "Today";
}