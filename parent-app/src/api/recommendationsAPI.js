import { PLACEHOLDER_ACTIVITY_IMG } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1"
import { roundRating } from "../utils/ratings"
import { APIResponse, fetchWrapper, RESPONSE_STATUS } from "./fetchAPI"

function reshapeActivityTileData(responseData) {
    if (!responseData) return []

    return responseData.map(activityRaw => {
        return {
            activityId: activityRaw.activity_id ?? activityRaw.id,
            //imgSrc: activityRaw.images.length ? activityRaw.images[0] : PLACEHOLDER_ACTIVITY_IMG,
            imgSrc: activityRaw.images ? (activityRaw.images.length ? activityRaw.images[0] : PLACEHOLDER_ACTIVITY_IMG) : PLACEHOLDER_ACTIVITY_IMG,
            name: activityRaw.name,
            rating: roundRating(activityRaw.rating),
            locationName: activityRaw.address,
            price: activityRaw.price,
            nextDate: activityRaw.date ?? `${activityRaw.day}, ${activityRaw.time}`
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

function fetchUserBasedActivities(endpoint, callback, isPaginated) {
    fetchWrapper({
        endpoint: endpoint,
        method: 'GET',
        omitAuthHeader: false,
        needAuth: false,
        callback: (response) => {
            console.log(response);
            callback(new APIResponse(reshapeActivityTileData(isPaginated ? response.data.page : response.data), true, RESPONSE_STATUS.OK))
        }
    })
}

export function fetchUpcomingActivities(n, callback) {
    fetchUserBasedActivities(`parent/upcoming?pageNumber=1&pageSize=${n}`, callback, true)
}

export function fetchSameProviderActivities(activityId, n, callback) {
    fetchRecommendedActivities(`search/activity/${activityId}/same_seller`, n, callback)
}

export function fetchSamePlaceActivities(activityId, n, callback) {
    fetchRecommendedActivities(`search/activity/${activityId}/same_place`, n, callback)
}

export function fetchRebookActivities(n, callback) {
    fetchUserBasedActivities(`parent/recently_booked?number=${n}`, callback, false)
}

export function fetchPopularActivities(n, callback) {
    fetchRecommendedActivities(`search/activities/popular`, n, callback)
}
