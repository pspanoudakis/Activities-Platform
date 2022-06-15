const ADD_DELAY = true
const DELAY_MILISECS = 1000

export function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function runWithDelay(callback) {
    if (ADD_DELAY) {
        delay(DELAY_MILISECS).then(() => callback())
    }
    else {
        callback()
    }
}
