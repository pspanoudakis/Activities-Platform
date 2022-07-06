export function dateText(date) {
    if (!date) {
        return ''
    }
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export function dateTimeText(date) {
    let hoursText = date.getHours().toString()
    hoursText = hoursText.length > 1 ? hoursText : `0${hoursText}`

    let minutesText = date.getMinutes().toString()
    minutesText = minutesText.length > 1 ? minutesText : `0${minutesText}`
    
    return `${hoursText}:${minutesText}`
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
