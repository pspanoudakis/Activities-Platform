export function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const ADD_DELAY = true
const DELAY_DURATION = 1500

export function fetchUserResults(searchBy, key, callback) {
    if (ADD_DELAY) {
        delay(DELAY_DURATION).then(() => {
            callback([1,2])
        })
    }
    else {
        callback([1,2])
    }
}
