import { runWithDelay } from "./delay"
import { fetchWrapper } from "./fetchAPI"

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
        callback
    })
}
