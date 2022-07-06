import { updateJwt } from "./jwt"
import { APIResponse, fetchWrapper } from "./fetchAPI";

function loginCallback(callback, renewJwt) {
    return (response) => {
        console.log(response)
        if (response.ok) {
            if (renewJwt) {
                updateJwt(response.auth)
            }
        }
        callback(new APIResponse(response.data, response.ok, response.status))
    }
}

export function loginWithCredentials(username, password, callback) {
    fetchWrapper({
        endpoint: 'admin/login',
        method: 'POST',
        body: {
            username, password
        },
        omitAuthHeader: true,
        needAuth: true,
        callback: loginCallback(callback, true)
    })
}

export function loginWithJwt(callback) {
    fetchWrapper({
        endpoint: 'admin/quick_login',
        method: 'POST',
        body: { },
        callback: loginCallback(callback, false)
    })
}
