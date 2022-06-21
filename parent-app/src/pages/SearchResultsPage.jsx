import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ActivityResults } from "../components/ActivityResults";
import { SearchFiltersWrapper } from "../components/SearchFiltersWrapper";
import { useHasMaxWidth } from "../hooks/useHasMaxWidth";
import { MD_PXLIMIT } from "../utils/deviceConstants";

/**
 * @typedef {object} FilterOptions
 * @property {object | undefined} categories
 * @property {number | undefined} ageCategory
 * @property {number | undefined} minPrice
 * @property {number | undefined} maxPrice
 * @property {string | undefined} startDate
 * @property {string | undefined} endDate
 * @property {string | undefined} district
 * @property {number | undefined} maxDistance
 */

// Will get this from context probably
const categories = (() => {
    const idxs = [...Array(8).keys()]
    const categories = {}
    idxs.forEach(i => {
        categories[`MainCategory${i}`] = [
            `Subcategory${i}_1`,
            `Subcategory${i}_2`,
            `Subcategory${i}_3`,
            `Subcategory${i}_4`,
        ]
    })
    //console.log(categories);
    return categories
})()
export function SearchResultsPage() {

    const params = useParams()
    const [searchOptions, setSearchOptions] = useState({
        text: params.text ?? '',        
        /** @type {FilterOptions} */
        filters: {
            categories: Object.keys(categories).reduce((storedMain, category) => {
                storedMain[category] = {
                    isSelected: false,
                    subcategories: categories[category].reduce((storedSub, subcategory) => {
                        storedSub[subcategory] = false
                        return storedSub
                    }, {})
                }
                return storedMain
            }, {})
        }
    })

    //useEffect(() => console.log('state', searchOptions), [])

    const updateFilters = (newFilters) => {
        //console.log(newFilters)
        setSearchOptions({
            text: searchOptions.text,
            filters: newFilters
        })
    }

    const mdDevice = useHasMaxWidth(MD_PXLIMIT)
    const [filtersOpen, setFiltersOpen] = useState(false)

    useEffect(() => {
        setFiltersOpen(false)
    }, [mdDevice])

    useEffect(() => {
        setSearchOptions({
            text: params.text,
            filters: searchOptions.filters
        })
    }, [params])

    return (
        <div className={`w-full flex ${mdDevice ? 'flex-col gap-2 px-2' : 'flex-row gap-3'} items-start justify-center`}>
            <SearchFiltersWrapper
                isOpen={filtersOpen || !mdDevice}
                keepOpen={!mdDevice}
                setOpen={setFiltersOpen}
                options={searchOptions.filters}
                setOptions={updateFilters}
            />
            <ActivityResults
                options={searchOptions}
                initialHomePosition={{
                    "lat": 38.11987459663194,
                    "lng": 23.866071050478975
                }}
            />
        </div>
    )
}
