import { PENDING_ACTIVITY } from "./fixedData";

export function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const ADD_DELAY = true
const DELAY_DURATION = 1500

export const SEARCH_BY_ID = 'id'
export const SEARCH_BY_NAME = 'name'

function getUsersData(key) {
    const __users__ = JSON.parse(localStorage.getItem("__users__"))
    return __users__.filter(u => u.username.includes(key))
}

function getPendingActivitiesData() {
    const __activities__ = JSON.parse(localStorage.getItem("__activities__"))
    return __activities__.filter(a => a.status === PENDING_ACTIVITY)
}

function getDataPage(data, requestedPage, pageSize) {
    if (data.length <= pageSize) {
        return {
            results: data,
            totalPages: 1
        }
    }
    //const endIndex = requestedPage*pageSize
    const endIndex = (requestedPage + 1)*pageSize
    return {
        totalPages: Math.ceil(data.length / pageSize),
        results: data.slice(endIndex - pageSize, endIndex)
    }
}

export function fetchUserResults(key, callback) {

    if (ADD_DELAY) {
        delay(DELAY_DURATION).then(() => {
            callback(getUsersData(key))
        })
    }
    else {
        callback(getUsersData(key))
    }
}

export function fetchUserResultsPage(key, requestedPage, pageSize, callback) {
    console.log(arguments)
    const response = getDataPage(getUsersData(key), requestedPage, pageSize)
    if (ADD_DELAY) {
        delay(DELAY_DURATION).then(() => {
            callback(response)
        })
    }
    else {
        callback(response)
    }
    console.log(response);
}

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

export function fetchPendingActivitiesPage(requestedPage, pageSize, callback) {
    console.log(arguments)
    const response = getDataPage(getPendingActivitiesData(), requestedPage, pageSize)
    if (ADD_DELAY) {
        delay(DELAY_DURATION).then(() => {
            callback(response)
        })
    }
    else {
        callback(response)
    }
    //console.log(response);
}

export function addNewUser(userInfo, callback) {
    console.log(arguments)
    const __users__ = JSON.parse(localStorage.getItem("__users__"))
    __users__.push({
        username: userInfo.username,
        isLocked: false,
        latestBookings: [],
        role: userInfo.role
    })
    localStorage.setItem("__users__", JSON.stringify(__users__))
    if (ADD_DELAY) {
        delay(DELAY_DURATION).then(() => {
            callback({ok: true})
        })
    }
    else {
        callback({ok: true})
    }
}