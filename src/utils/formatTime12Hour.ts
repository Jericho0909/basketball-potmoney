export default function formatTime12(time24: string): string{
    const [hourStr, minute] = time24.split(":")
    let hour = parseInt(hourStr)
    const ampm = hour >= 12 ? "PM" : "AM"
    hour = hour % 12 || 12
    return `${hour}:${minute} ${ampm}`
}