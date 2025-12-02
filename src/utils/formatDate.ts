export default function formatDate(dateStr: string): string {
    const date = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric"
    }

    const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

    return formatted.replace(/^([A-Za-z]+)\s/, "$1. ")
}