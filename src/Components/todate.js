export default function ToDate(param) {
    try {
        const date = new Date(param)
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }
    catch {
        return 'Error'
    }
}