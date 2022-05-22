import { __users__ } from "./fixedData";

export function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const ADD_DELAY = true
const DELAY_DURATION = 1500

export const SEARCH_BY_ID = 'id'
export const SEARCH_BY_NAME = 'name'

export function fetchUserResults(searchBy, key, callback) {
    function getData(searchBy, key) {
        let results = []
        if (searchBy === SEARCH_BY_ID) {
            if (__users__[key]) {
                results.push(__users__[key])
            }
        }
        else if (searchBy === SEARCH_BY_NAME) {
            for (const user of Object.values(__users__)) {
                if (user.username.includes(key)) {
                    results.push(user)
                }
            }
        }
        return results
    }

    if (ADD_DELAY) {
        delay(DELAY_DURATION).then(() => {
            callback(getData(searchBy, key))
        })
    }
    else {
        callback(getData(searchBy, key))
    }
}
