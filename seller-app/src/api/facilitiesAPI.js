
import { fetchWrapper } from './fetchAPI.js'

export function fetchFacilities(callback) {
    fetchWrapper({
        endpoint: '/seller/facilities',
        method: 'GET',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function fetchFacilitiesNumber(callback) {
    fetchWrapper({
        endpoint: '/seller/total_facilities',
        method: 'GET',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}
