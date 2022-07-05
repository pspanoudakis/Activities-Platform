import { fetchWrapper } from "./fetchAPI"

export function fetchUserCards(callback) {
    fetchWrapper({
        endpoint: 'parent/cards',
        method: 'GET',
        omitAuthHeader: false,
        needAuth: false,
        callback
    })
}

export function updateUserCard(newInfo, cardId, callback) {
    let body = newInfo

    if (cardId) {
        body['id'] = cardId
    }
    fetchWrapper({
        endpoint: 'parent/add_card',
        method: 'POST',
        body,
        omitAuthHeader: false,
        needAuth: false,
        callback
    })
}

export function addPoints(amount, callback) {
    fetchWrapper({
        endpoint: `parent/add_points/${amount}`,
        method: 'POST',
        body: {},
        omitAuthHeader: false,
        needAuth: false,
        callback: (response) => {
            if (response.ok) {
                callback({data: response.data.balance, ok: true})
            }
            else {
                callback(response)
            }
        }
    })
}

export function updateUser(newInfo, callback) {
    fetchWrapper({
        endpoint: `parent/edit_profile`,
        method: 'POST',
        body: newInfo,
        omitAuthHeader: false,
        needAuth: false,
        callback
    })
}

export function fetchAllUpcomingActivities(currentPage, pageSize, callback) {
    fetchWrapper({
        endpoint: `parent/upcoming?pageNumber=${currentPage}&pageSize=${pageSize}`,
        method: 'GET',
        omitAuthHeader: false,
        needAuth: false,
        callback
    })
}
