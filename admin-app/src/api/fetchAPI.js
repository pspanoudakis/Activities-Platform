import { delay, runWithDelay } from "./delay"
import { getJwt } from "./jwt"

//const REST_API_DOMAIN = 'https://localhost:8070'
const REST_API_DOMAIN = 'https://localhost:8070'
const createEndpoint = (endpoint) => `${REST_API_DOMAIN}/${endpoint}`

export class APIResponse {
    constructor(data, ok, status) {
        this.data = data
        this.ok = ok
        this.status = status
    }
}

// Maybe use these to indicate specific scenarios
export const RESPONSE_STATUS = {
    OK: 200,
    BAD_REQUEST: 401,

    // to be properly set when known
    EXPIRED_JWT: -1
}

export function fetchWrapper({endpoint, method, body, needAuth, omitAuthHeader, callback}) {
    runWithDelay(() => 
        fetch(
            createEndpoint(endpoint),
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': omitAuthHeader ? '' : `Bearer ${getJwt()}`
                },
                body: method === 'POST' ? JSON.stringify(body) : undefined
            }
        )
        .then(response => {
            //console.log(response);
            if (response.ok) {
                response.json().then(rjson => {
                    callback({
                        data: rjson,
                        ok: true,
                        auth: needAuth ? response.headers.get('Authorization') : {}
                    })
                }).catch((e) => {
                    console.log(e)
                    callback({
                        data: null,
                        ok: true,
                        auth: needAuth ? response.headers.get('Authorization') : {}
                    })
                })
            }
            else {
                callback({
                    ok: false,
                    status: response.status
                })
            }
        })
    )
}

export async function fetchAsyncWrapper({endpoint, method, body}) {
    await delay(750)
    return await fetch(
        createEndpoint(endpoint),
        {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: method === 'POST' ? JSON.stringify(body) : undefined
        }
    )
    .then(async response => {
        if (response.ok) {
            return {
                data: await response.json(),
                ok: true,
                status: RESPONSE_STATUS.OK
            }
        }
        else {
            return {
                ok: false,
                status: response.status
            }
        }
    })
}
