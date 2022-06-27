import { fetchWrapper } from "./fetchAPI"

function buildSearchParams(options, requestedPage, pageSize) {
    let paramStr = ''

    return `?page_number=${requestedPage + 1}&page_size=${pageSize}`
}

function buildSearchRequestBody(options) {
    return {}
}

export function fetchActivityResults(options, requestedPage, pageSize, callback) {

    fetchWrapper({
        endpoint: `search/activities${buildSearchParams(options, requestedPage, pageSize)}`,
        method: 'POST',
        body: buildSearchRequestBody(options),
        omitAuthHeader: true,
        needAuth: false,
        callback: (response) => {
            console.log(response)
            callback({
                ok: response.ok,
                totalPages: response.ok ? response.data.total_pages : -1,
                data: response.ok ? response.data.page : []
            })
        }
    })
}
