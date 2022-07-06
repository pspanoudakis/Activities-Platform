export function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const ADD_DELAY = true
const DELAY_DURATION = 1500

export const SEARCH_BY_ID = 'id'
export const SEARCH_BY_NAME = 'name'

export function fetchPlatformStats(callback) {
    const stats = {
        parents: 1124,
        providers: 321,
        bookings: 520,
        activities: 404,
        facilities: 316,
        pendingActivities: 68
    }
    if (ADD_DELAY) {
        delay(DELAY_DURATION).then(() => {
            callback(stats)
        })
    }
    else {
        callback(stats)
    }
}
