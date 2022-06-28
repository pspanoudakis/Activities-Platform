import { runWithDelay } from "./delay"
import { APIResponse, RESPONSE_STATUS } from "./fetchAPI"

export function fetchRecommendedActivities(n, callback) {
    const results = [...Array(n).keys()].map((_, i) => {

        return {
            imgSrc: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1000&h=-1&s=1`,
            name: `Activity${i}`,
            rating: 3.9,
            locationName: `Κυκλαμίνων 48, Άνοιξη Αττικής`,
            price: 100
        }
    })
    runWithDelay(() => callback(new APIResponse(results, true, RESPONSE_STATUS.OK)))
}

export function fetchUpcomingActivities(userId, n, callback) {
    const results = [...Array(n).keys()].map((_, i) => {

        return {
            imgSrc: `http://fairplay5x5.gr/wp-content/uploads/2015/09/slide1.jpg`,
            name: `Activity${i}`,
            locationName: `Κυκλαμίνων 48, Άνοιξη Αττικής`,
            nextDate: `11/4/22 14:00`
        }
    })
    runWithDelay(() => callback(new APIResponse(results, true, RESPONSE_STATUS.OK)))
}

export function fetchSameProviderActivities(activityId, n, callback) {
    fetchRecommendedActivities(n, callback)
}

export function fetchSamePlaceActivities(activityId, n, callback) {
    fetchRecommendedActivities(n, callback)
}

export function fetchRebookActivities(userId, n, callback) {
    fetchRecommendedActivities(n, callback)
}

export function fetchPopularActivities(n, callback) {
    fetchRecommendedActivities(n, callback)
}
