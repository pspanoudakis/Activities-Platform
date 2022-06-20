import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ActivityResults } from "../components/ActivityResults";
import { SearchFiltersWrapper } from "../components/SearchFiltersWrapper";
import { useHasMaxWidth } from "../hooks/useHasMaxWidth";
import { MD_PXLIMIT } from "../utils/deviceConstants";

/**
 * @typedef {object} FilterOptions
 * @property {number | undefined} categoryId
 * @property {number | undefined} ageCategory
 * @property {number | undefined} minPrice
 * @property {number | undefined} maxPrice
 * @property {string | undefined} startDate
 * @property {string | undefined} endDate
 * @property {string | undefined} district
 * @property {number | undefined} maxDistance
 */

export function SearchResultsPage() {

    const params = useParams()
    const [searchOptions, setSearchOptions] = useState({
        text: params.text ?? '',        
        /** @type {FilterOptions} */
        filters: {}
    })

    const updateFilters = (newFilters) => {
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
        console.log('text changed')
        setSearchOptions({
            text: params.text,
            filters: searchOptions.filters
        })
    }, [params])

    return (
        <div className={`w-full flex ${mdDevice ? 'flex-col gap-2 px-2' : 'flex-row gap-3'} items-center justify-center`}>
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
