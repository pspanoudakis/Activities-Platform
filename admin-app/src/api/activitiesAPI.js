import { APIResponse, fetchWrapper, RESPONSE_STATUS } from "./fetchAPI";

export function fetchPendingActivities(pageNumber, pageSize, callback) {
    fetchWrapper({
        endpoint: `admin/pending_activities?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'GET',
        callback
    })
}

function reshapeActivityContent(activityResponse) {
    console.log(activityResponse)
    const activity = {
        name: activityResponse.name,
        providerName: activityResponse.seller_name,
        description: activityResponse.description,
        price: activityResponse.cost,
        images: activityResponse.images,
        location: {
            address: activityResponse.address,
            latitude: activityResponse.latitude,
            longitude: activityResponse.longitude
        }
    }
    return activity
}

export function fetchActivity(activityId, callback) {    
    fetchWrapper({
        endpoint: `admin/activity/${activityId}`,
        method: 'GET',
        callback: (response) => {
            if (response.ok) {
                callback(new APIResponse(reshapeActivityContent(response.data), true, RESPONSE_STATUS.OK))
            }
            else {
                callback(new APIResponse(null, false, -1))
            }
        }
    })
}

export function approveActivity(activityId, callback) {
    fetchWrapper({
        endpoint: `admin/activity/${activityId}/approve`,
        method: 'POST',
        callback
    })
}

export function rejectActivity(activityId, callback) {
    fetchWrapper({
        endpoint: `admin/activity/${activityId}`,
        method: 'DELETE',
        callback
    })
}
