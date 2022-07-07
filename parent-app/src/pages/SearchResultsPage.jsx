import React, { useEffect, useState, useRef, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAgeCategories, fetchCategories, fetchDistrictNames } from "../api/searchAPI";
import { AppContext } from "../AppContext";
import { ActivityResults } from "../components/ActivityResults";
import { SearchFiltersWrapper } from "../components/SearchFiltersWrapper";
import { useHasMaxWidth } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { MD_PXLIMIT } from "../utils/deviceConstants";
import { defaultHomePosition } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";

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

export function SearchResultsPage() {

    const context = useContext(AppContext)

    const [params, setParams] = useSearchParams()
    const [loading, setLoading] = useState(true)
    const storedSelectedCategories = useRef(params.get('categories') ? JSON.parse(params.get('categories')) : [])
    const storedAvailableCategories = useRef({})

    const [searchOptions, setSearchOptions] = useState({
        text: params.get('text') ?? '',        
        /** @type {FilterOptions} */
        filters: {
            categories: {},
            ageCategories: [],
            priceRange: ['', ''],
            dateRange: ['', ''],
            minRating: [...Array(5).keys()].map(_ => false),
            districts: {},
            maxDistance: ''
        }
    })

    const mdDevice = useHasMaxWidth(MD_PXLIMIT)
    const [filtersOpen, setFiltersOpen] = useState(false)

    useEffect(() => {
        let districts = {}
        let ageCategories = []
        let categories = []

        Promise.all([
            fetchCategories().then((response) => {
                if (response.ok) {
                    storedAvailableCategories.current = response.data
                    categories = Object.keys(response.data).reduce((storedMain, category) => {
                        storedMain[category] = {
                            isSelected: storedSelectedCategories.current.includes(category),
                            subcategories: response.data[category].reduce((storedSub, subcategory) => {
                                storedSub[subcategory] = storedSelectedCategories.current.includes(subcategory)
                                return storedSub
                            }, {})
                        }
                        return storedMain
                    }, {})
                }
                else {
                    console.log('Failed to fetch Categories');
                }
            }),
            fetchAgeCategories().then((response) => {
                if (response.ok) {
                    ageCategories = response.data.map((ageCategory, i) => {
                        return {
                            id: ageCategory.id,
                            name: ageCategory.name,
                            isSelected: i === 0
                        }
                    })
                }
                else {
                    console.log('Failed to fetch Age Categories');
                }
            }),
            fetchDistrictNames().then((response) => {
                if (response.ok) {
                    districts = response.data.reduce((stored, current) => {
                        return {
                            ...stored,
                            [current]: false
                        }
                    }, {})
                }
                else {
                    console.log('Failed to fetch District Names');
                }
            })            
        ]).then(() => {
            setSearchOptions({
                ...searchOptions,
                filters: {
                    ...searchOptions.filters,
                    categories,
                    ageCategories,
                    districts
                }
            })
            setLoading(false)
        })

    }, [])

    useEffect(() => {
        setFiltersOpen(false)
    }, [mdDevice])

    useEffect(() => {
        const newCategories = (params.get('categories') ? JSON.parse(params.get('categories')) : [])
        const categoriesChanged = newCategories.join(',') !== storedSelectedCategories.current.join(',')
        if (categoriesChanged) {
            storedSelectedCategories.current = newCategories
        }
        setSearchOptions({
            text: params.get('text') ?? '',
            filters: (
                categoriesChanged ?
                {
                    ...searchOptions.filters,
                    categories: Object.keys(storedAvailableCategories.current).reduce((storedMain, category) => {
                        storedMain[category] = {
                            isSelected: newCategories.includes(category),
                            subcategories: storedAvailableCategories.current[category].reduce((storedSub, subcategory) => {
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

    const updateFilters = (newFilters) => {
        setSearchOptions({
            text: searchOptions.text,
            filters: newFilters
        })
    }

    return (
        loading ?
        <LoadingIndicator stretchParent={false}/>
        :
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
                initialHomePosition={
                    context.state.userInfo ?
                    {
                        "lat": context.state.userInfo.latitude ?? defaultHomePosition.lat,
                        "lng": context.state.userInfo.longitude ?? defaultHomePosition.lng
                    }
                    :
                    defaultHomePosition
                }
                initialAddress={context.state.userInfo ? (context.state.userInfo.address ?? '') : ''}
            />
        </div>
    )
}
