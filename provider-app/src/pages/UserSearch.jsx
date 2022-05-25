import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchUserResultsPage, SEARCH_BY_ID, SEARCH_BY_NAME } from '../api';
import { UserResultsTable } from '../components/UserResultsTable';

const defaultPaginationState = {
    currentPage: 0,
    pageSize: 8,
    totalPages: -1
}

export function UserSearch() {

    const [searchParams] = useSearchParams();
    const searchBy = searchParams.get('searchBy')
    const searchKey = searchParams.get('key')

    const [paginationState, setPaginationState] = useState(defaultPaginationState)
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const fetchIdRef = useRef(0)
    //const [tableKey, setTableKey] = useState(0)

    const isSearchValid = () => (searchBy === SEARCH_BY_ID || searchBy === SEARCH_BY_NAME)

    const updateResults = (newPage, newPageSize) => {
        console.log('table requests update')
        setPaginationState({
            ...paginationState,
            currentPage: newPage,
            pageSize: newPageSize
        })
    }

    const fetchPageAndRerender = () => {
        const fetchId = ++fetchIdRef.current

        fetchUserResultsPage(searchBy, searchKey, paginationState.currentPage, paginationState.pageSize, (response) => {
            if (fetchId === fetchIdRef.current) {
                setResults(response.results)
                setPaginationState({
                    ...paginationState,
                    totalPages: response.totalPages
                })
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        if (loading) {
            //console.log('loading effect');
            if (isSearchValid() && searchKey) {
                fetchPageAndRerender()
            }
            else {
                setResults([])
                setLoading(false)
            }
        }
    }, [loading])

    useEffect(() => {
        setLoading(true)
    }, [searchParams, paginationState.currentPage, paginationState.pageSize])

    /* useEffect(() => {
        setLoading(true)
    }, [paginationState.currentPage, paginationState.pageSize])


    useEffect(() => {
        setPaginationState(defaultPaginationState)
        // Force table to re-mount
        //setTableKey(tableKey + 1)
    }, [searchBy, searchKey]) */

    return (
        <UserResultsTable
            //tableKey={tableKey}
            results={results}
            updateResults={updateResults}
            pageSize={paginationState.pageSize}
            currentPage={paginationState.currentPage}
            totalPages={paginationState.totalPages}
            loading={loading}
        />
    )
}
