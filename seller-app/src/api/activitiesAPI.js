import { fetchWrapper } from './fetchAPI.js'

export function createNewActivity(newInfo, callback) {
    fetchWrapper({
        endpoint: `seller/new_activity`,
        method: 'POST',
        body: newInfo,
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function fetchActivities(callback) {
    fetchWrapper({
        endpoint: 'seller/activities',
        method: 'GET',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function fetchActivityInfo(id, callback) {
    fetchWrapper({
        endpoint: `seller/activity_details/${id}`,
        method: 'GET',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function fetchActivityReviews(id,callback){
    fetchWrapper({
        endpoint: `seller/activity_reviews/${id}`,
        method: 'GET',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function fetchCategories(callback){
    fetchWrapper({

    })
}