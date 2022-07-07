import { updateJwt } from "./jwt"
import { APIResponse, fetchWrapper } from "./fetchAPI";

export function flattenUserInfo(userInfo) {
    return {
        address: userInfo.address,
        id: userInfo.id,
        latitude: userInfo.latitude,
        longitude: userInfo.longitude,
        ...userInfo.user
    }
}

function loginCallback(callback, renewJwt) {
    return (response) => {
        console.log(response)
        let responseData = response.data;
        if (response.ok) {
            if (renewJwt) {
                updateJwt(response.auth)
            }
            responseData = flattenUserInfo(response.data)
        }
        callback(new APIResponse(responseData, response.ok, response.status))
    }
}

export function loginWithCredentials(username, password, callback) {
    fetchWrapper({
        endpoint: 'seller/login',
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
        endpoint: 'seller/quick_login',
        method: 'POST',
        body: { },
        omitAuthHeader: false,
        needAuth: false,
        callback: loginCallback(callback, false)
    })
}

export function signUp(username, email, password, callback) {
    fetchWrapper({
        endpoint: 'seller/signup',
        method: 'POST',
        body: {
            username,
            email,
            password
        },
        omitAuthHeader: true,
        needAuth: true,
        callback: loginCallback(callback, true)
    })
}
