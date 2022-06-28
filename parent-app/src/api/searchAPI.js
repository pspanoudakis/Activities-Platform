import { fetchWrapper } from "./fetchAPI"

const parameterValueGetters = {
    'age_category': ({ageCategories}) => {
        console.log(ageCategories);
        for (const c of ageCategories) {
            if (c.isSelected) {
                return c.id
            }
        }
        return ''
    },
    'min_price': ({priceRange}) => {
        return priceRange[0]
    },
    'max_price': ({priceRange}) => {
        return priceRange[1]
    },
    'start_date': ({dateRange}) => {
        return dateRange[0]
    },
    'end_date': ({dateRange}) => {
        return dateRange[1]
    },
    'rating': ({minRating}) => {
        const rating = minRating.findIndex(r => r)
        return rating != -1 ? rating + 1 : ''
    },
    'district': ({districts}) => {
        for (const d in districts) {
            if (districts[d]) {
                return d
            }
        }
        return ''
    },
    'max_distance': ({maxDistance}) => maxDistance
}
function buildSearchParams(options, requestedPage, pageSize) {
    let paramStr = `page_number=${requestedPage + 1}&page_size=${pageSize}`

    for (const [paramName, getter] of Object.entries(parameterValueGetters)) {
        const paramValue = getter(options.filters)
        if (paramValue) {
            paramStr = `${paramStr}&${paramName}=${paramValue}`
        }
    }

    return paramStr
}

function buildSearchRequestBody(options) {
    return {}
}

export function fetchActivityResults(options, requestedPage, pageSize, callback) {
    fetchWrapper({
        endpoint: `search/activities?${buildSearchParams(options, requestedPage, pageSize)}`,
        method: 'GET',
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
