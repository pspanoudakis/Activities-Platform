import { fetchWrapper } from "./fetchAPI";

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
