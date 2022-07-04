import { PLACEHOLDER_ACTIVITY_IMG } from "../utils/placeholders"
import { roundRating } from "../utils/ratings"
import { APIResponse, fetchWrapper, RESPONSE_STATUS } from "./fetchAPI"

function reshapeActivityTileData(responseData) {
    /* const results = [...Array(n).keys()].map((_, i) => {

        return {
            imgSrc: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1000&h=-1&s=1`,
            name: `Activity${i}`,
            rating: 3.9,
            locationName: `Κυκλαμίνων 48, Άνοιξη Αττικής`,
            price: 100
            nextDate: `11/4/22 14:00`
        }
    }) */
    
    if (!responseData) return []
    return responseData.map(activityRaw => {
        return {
            activityId: activityRaw.activity_id,
            imgSrc: activityRaw.images[0] ?? PLACEHOLDER_ACTIVITY_IMG,
            name: activityRaw.name,
            rating: roundRating(activityRaw.rating),
            locationName: activityRaw.address,
            price: activityRaw.price,
            nextDate: activityRaw.date
        }
    })
}
function fetchRecommendedActivities(endpoint, n, callback) {
    fetchWrapper({
        endpoint: endpoint,
        method: 'GET',
        omitAuthHeader: true,
        needAuth: false,
        callback: (response) => {
            console.log(response);
            callback(new APIResponse(reshapeActivityTileData(response.data), true, RESPONSE_STATUS.OK))
        }
    })
}

function fetchUserBasedActivities(endpoint, callback) {
    fetchWrapper({
        endpoint: endpoint,
        method: 'GET',
        omitAuthHeader: false,
        needAuth: false,
        callback: (response) => {
            console.log(response);
            callback(new APIResponse(reshapeActivityTileData(response.data), true, RESPONSE_STATUS.OK))
        }
    })
}

export function fetchUpcomingActivities(n, callback) {
    fetchUserBasedActivities(`parent/upcoming`, callback)
}

export function fetchSameProviderActivities(activityId, n, callback) {
    fetchRecommendedActivities(`search/activity/${activityId}/same_seller`, n, callback)
}

export function fetchSamePlaceActivities(activityId, n, callback) {
    fetchRecommendedActivities(`search/activity/${activityId}/same_place`, n, callback)
}

export function fetchRebookActivities(n, callback) {
    fetchUserBasedActivities(`parent/recently_booked`, callback)
}

export function fetchPopularActivities(n, callback) {
    fetchRecommendedActivities(`search/activities/popular`, n, callback)
}
