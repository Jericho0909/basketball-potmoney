export default function formatPeso(value: number): string {
    return new Intl.NumberFormat("en-PH").format(value)
}