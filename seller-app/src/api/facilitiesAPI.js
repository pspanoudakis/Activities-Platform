
import { fetchWrapper } from './fetchAPI.js'

export function fetchFacilities(callback) {
    fetchWrapper({
        endpoint: 'seller/facilities',
        method: 'GET',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function fetchFacilitiesNumber(callback) {
    fetchWrapper({
        endpoint: 'seller/total_facilities',
        method: 'GET',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function createNewFacility(newInfo, callback) {
    fetchWrapper({
        endpoint: `seller/new_facility`,
        method: 'POST',
        body: newInfo,
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function updateFacility(updatedData,id,callback) {
    fetchWrapper({
        endpoint: `seller/facility/${id}`,
        method: 'PUT',
        body: updatedData,
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}