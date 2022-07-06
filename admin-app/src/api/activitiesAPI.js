import { fetchWrapper } from "./fetchAPI";

export function fetchPendingActivities(pageNumber, pageSize, callback) {
    fetchWrapper({
        endpoint: `admin/pending_activities?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'GET',
        callback
    })
}
