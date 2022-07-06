import { APIResponse, fetchWrapper, RESPONSE_STATUS } from "./fetchAPI";

export function fetchUsers(searchKey, pageNumber, pageSize, callback) {
    fetchWrapper({
        endpoint: `admin/get_users?username=${searchKey}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'GET',
        callback
    })
}

export function createUser({username, email, password, role}, callback) {
    fetchWrapper({
        endpoint: `admin/create_user`,
        method: 'POST',
        body: {
            username,
            email,
            password,
            role 
        },
        callback
    })
}

export function fetchUser(username, callback) {
    fetchWrapper({
        endpoint: `admin/get_users?username=${username}&pageNumber=1&pageSize=1`,
        method: 'GET',
        callback: (response) => {
            if (response.ok) {
                let userResult = null
                if (response.data.page.length > 0) {
                    userResult = response.data.page[0]
                }
                callback(new APIResponse(userResult, response.ok && Boolean(userResult), RESPONSE_STATUS.OK))
            }
            else {
                callback(new APIResponse(null, false, response.status))
            }
        }
    })
}

export function changeUserPassword(username, newPassword, callback) {
    fetchWrapper({
        endpoint: `admin/change_password/${username}`,
        method: 'POST',
        body: {
            password: newPassword
        },
        callback
    })
}
