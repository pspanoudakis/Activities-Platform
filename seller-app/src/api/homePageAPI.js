import {fetchWrapper} from "./fetchAPI";

export function fetchTotalActivities(callback) {
    fetchWrapper({
        endpoint:"seller/total_activities",
        method:'GET',
        body:'',
        omitAuthHeader:false,
        needAuth:true,
        callback
    })
}

export function fetchTotalFacilities(callback) {
    fetchWrapper({
        endpoint:"seller/total_facilities",
        method:'GET',
        body:'',
        omitAuthHeader:false,
        needAuth:true,
        callback
    })
}

export function fetchRecentBookings(callback)  {
    fetchWrapper({
        endpoint:"seller/recent_reservations",
        method:'GET',
        body:'',
        omitAuthHeader:false,
        needAuth:true,
        callback
    })
}

