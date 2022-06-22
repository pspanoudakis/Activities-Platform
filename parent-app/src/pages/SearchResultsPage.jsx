import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ActivityResults } from "../components/ActivityResults";
import { SearchFiltersWrapper } from "../components/SearchFiltersWrapper";
import { useHasMaxWidth } from "../hooks/useHasMaxWidth";
import { MD_PXLIMIT } from "../utils/deviceConstants";

/**
 * @typedef {object} FilterOptions
 * @property {object} categories
 * @property {Array<object>} ageCategories
 * @property {[string, string]} priceRange
 * @property {[string, string]} dateRange
 * @property {Array<object>} minRating
 * @property {Array<object>} districts
 * @property {string} maxDistance
 */


// Will probably fetch these two

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

const ageCategories = {
    1: 'Προσχολική (0-5)',
    2: 'Δημοτικού (6-11)',
    3: 'Γυμνασίου (12-15)',
}

const districtNames = [
    'Αθήνα',
    'Θεσσαλονίκη',
    'Πάτρα',
    'Λάρισα'
]


export function SearchResultsPage() {

    const [params, setParams] = useSearchParams()

    const storedCategories = useRef(params.get('categories') ? JSON.parse(params.get('categories')) : [])

    const [searchOptions, setSearchOptions] = useState({
        text: params.get('text') ?? '',        
        /** @type {FilterOptions} */
        filters: {
            categories: Object.keys(categories).reduce((storedMain, category) => {
                storedMain[category] = {
                    isSelected: storedCategories.current.includes(category),
                    subcategories: categories[category].reduce((storedSub, subcategory) => {
                        storedSub[subcategory] = storedCategories.current.includes(subcategory)
                        return storedSub
                    }, {})
                }
                return storedMain
            }, {}),
            ageCategories: Object.keys(ageCategories).map((ageCategory, i) => {
                return {
                    name: ageCategories[ageCategory],
                    isSelected: i === 0
                }
            }),
            priceRange: ['', ''],
            dateRange: ['', ''],
            minRating: [...Array(5).keys()].map(_ => false),
            districts: districtNames.reduce((stored, current) => {
                return {
                    ...stored,
                    [current]: false
                }
            }, {}),
            maxDistance: ''
        }
    })

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
        const newCategories = (params.get('categories') ? JSON.parse(params.get('categories')) : [])
        const categoriesChanged = newCategories.join(',') !== storedCategories.current.join(',')
        if (categoriesChanged) {
            storedCategories.current = newCategories
        }
        setSearchOptions({
            text: params.get('text') ?? '',
            filters: (
                categoriesChanged ?
                {
                    ...searchOptions.filters,
                    categories: Object.keys(categories).reduce((storedMain, category) => {
                        storedMain[category] = {
                            isSelected: newCategories.includes(category),
                            subcategories: categories[category].reduce((storedSub, subcategory) => {
                                storedSub[subcategory] = newCategories.includes(subcategory)
                                return storedSub
                            }, {})
                        }
                        return storedMain
                    }, {})
                }
                :
                searchOptions.filters
            )
        })
    }, [params])

    const updateUrlCategories = (newCategoriesParam) => {
        setParams({
            text: params.get('text') ?? '',
            categories: newCategoriesParam
        })
        //navigate(`/searchActivity?text=${params.get('text') ?? ''}&categories=${newCategoriesParam}`)
    }

    return (
        <div className={`w-full flex ${mdDevice ? 'flex-col gap-2 px-2' : 'flex-row gap-3'} items-start justify-center`}>
            <SearchFiltersWrapper
                isOpen={filtersOpen || !mdDevice}
                keepOpen={!mdDevice}
                setOpen={setFiltersOpen}
                options={searchOptions.filters}
                setOptions={updateFilters}
                updateCategories={updateUrlCategories}
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
