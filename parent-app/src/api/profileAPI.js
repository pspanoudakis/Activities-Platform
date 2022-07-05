import { runWithDelay } from "./delay"
import { APIResponse, fetchWrapper, RESPONSE_STATUS } from "./fetchAPI"
import { flattenUserInfo } from "./loginAPI"

export function fetchUserCards(callback) {
    runWithDelay(() => {
        fetchWrapper({
            endpoint: 'parent/cards',
            method: 'GET',
            omitAuthHeader: false,
            needAuth: false,
            callback
        })
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
        callback: (response) => {
            if (response.ok) {
                callback(new APIResponse(flattenUserInfo(response.data), true, RESPONSE_STATUS.OK))
            }
            else {
                callback(new APIResponse(null, false, response.status))
            }
        }
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
