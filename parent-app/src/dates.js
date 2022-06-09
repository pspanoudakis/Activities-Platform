export function dateText(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export function dateTimeText(date) {
    const text = `${date.getHours()}:${date.getMinutes()}`
    return text.length > 4 ? text : `0${text}`
}

export function equalDates(d1, d2) {
    return d1.getDay() === d2.getDay() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear()
}

export const DAY_NAMES = [
    'Κυριακή',
    'Δευτέρα',
    'Τρίτη',
    'Τετάρτη',
    'Πέμπτη',
    'Παρασκευή',
    'Σάββατο',
]
