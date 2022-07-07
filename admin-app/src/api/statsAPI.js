import { fetchWrapper } from "./fetchAPI";

export function fetchPlatformStats(callback) {
    fetchWrapper({
        endpoint: `admin/stats`,
        method: 'GET',
        callback
    })
}
