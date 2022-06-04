const ADD_DELAY = true
const DELAY_MILISECS = 1200

export function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function runWithDelay(callback) {
    if (ADD_DELAY) {
        delay(DELAY_MILISECS).then(() => callback())
    }
    else {
        callback()
    }
}

export function fetchRecommendedActivities(n, callback) {
    const results = [...Array(n).keys()].map((_, i) => {

        (new Image()).src = `img${i}`

        return {
            imgSrc: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1000&h=-1&s=1`,
            name: `Activity${i}`,
            rating: 3.9,
            locationName: `Κυκλαμίνων 48, Άνοιξη Αττικής`,
            price: 100
        }
    })
    runWithDelay(() => callback({ok: true, results: results}))
}

export function fetchUpcomingActivities(n, callback) {
    const results = [...Array(n).keys()].map((_, i) => {

        (new Image()).src = `img${i}`

        return {
            imgSrc: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1000&h=-1&s=1`,
            name: `Activity${i}`,
            locationName: `Κυκλαμίνων 48, Άνοιξη Αττικής`,
            nextDate: `11/4/22 14:00`
        }
    })
    runWithDelay(() => callback({ok: true, results: results}))
}

export function fetchRebookActivities(n, callback) {
    fetchRecommendedActivities(n, callback)
}
