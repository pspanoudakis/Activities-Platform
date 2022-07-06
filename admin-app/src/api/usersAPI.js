import { fetchWrapper } from "./fetchAPI";

export function fetchUsers(searchKey, pageNumber, pageSize, callback) {
    fetchWrapper({
        endpoint: `admin/get_users?username=${searchKey}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'GET',
        callback
    })
}
