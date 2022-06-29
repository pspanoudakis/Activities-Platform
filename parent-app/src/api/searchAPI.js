import { delay } from "./delay"
import { fetchAsyncWrapper, fetchWrapper } from "./fetchAPI"

const parameterValueGetters = {
    'age_category': ({ageCategories}) => {
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
        return rating !== -1 ? rating + 1 : ''
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

/* function buildSearchRequestBody(options) {
    return {}
} */

export function fetchActivityResults(options, requestedPage, pageSize, callback) {
    fetchWrapper({
        endpoint: `search/activities?${buildSearchParams(options, requestedPage, pageSize)}`,
        method: 'GET',
        //body: buildSearchRequestBody(options),
        omitAuthHeader: true,
        needAuth: false,
        callback: (response) => {
            //console.log(response)
            callback({
                ok: response.ok,
                totalPages: response.ok ? response.data.total_pages : -1,
                data: response.ok ? response.data.page : []
            })
        }
    })
}

export async function fetchCategories(needImgs) {
    /* return await fetchAsyncWrapper({
        endpoint: `search/all_categories`,
        method: "GET"
    }) */

    // Placeholder
    const imgPath = 'https://www.timeoutriyadh.com/cloud/timeoutriyadh/2021/09/30/lcJcmAZT-shutterstock_400441870-1200x760.jpg'
    const idxs = [...Array(6).keys()]
    const categories = {}
    idxs.forEach(i => {
        categories[`MainCategory${i}`] = needImgs ? {
            children: {
                [`Subcategory${i}_1`]: imgPath,
                [`Subcategory${i}_2`]: imgPath,
                [`Subcategory${i}_3`]: imgPath,
                [`Subcategory${i}_4`]: imgPath
            },
            img: imgPath
        }
        :
        [
            `Subcategory${i}_1`,
            `Subcategory${i}_2`,
            `Subcategory${i}_3`,
            `Subcategory${i}_4`,
        ]
    })
    categories['Άλλες Δραστηριότητες'] = needImgs ? {
        children: null,
        img: imgPath
    }
    :
    []

    await delay(1000)

    return {
        ok: true,
        data: categories
    }
}

export async function fetchDistrictNames() {
    return await fetchAsyncWrapper({
        endpoint: `search/districts`,
        method: "GET"
    })
}

export async function fetchAgeCategories() {
    return await fetchAsyncWrapper({
        endpoint: `search/age_categories`,
        method: "GET"
    })
}
