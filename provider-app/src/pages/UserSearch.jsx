import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchUserResults, fetchUserResultsPage, SEARCH_BY_ID, SEARCH_BY_NAME } from '../api';
import { UserResultsTable } from '../components/UserResultsTable';

export function UserSearch() {

    const [searchParams] = useSearchParams();
    const searchBy = searchParams.get('searchBy')
    const key = searchParams.get('key')

    const [paginationState, setPaginationState] = useState({
        currentPage: 0,
        pageSize: 4,
        totalPages: -1
    })
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const fetchIdRef = React.useRef(0)

    const isSearchValid = () => (searchBy === SEARCH_BY_ID || searchBy === SEARCH_BY_NAME)
    /* const fetchResultsAndUpdate = () => {
        fetchUserResults(searchBy, key, (results) => {
            setResults(results)
            setLoading(false)
        })
    } */

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

        fetchUserResultsPage(searchBy, key, paginationState.currentPage, paginationState.pageSize, (response) => {
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
            console.log('loading effect');
            if (isSearchValid() && key) {
                //fetchResultsAndUpdate()
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

    return (
        <UserResultsTable
            results={results}
            updateResults={updateResults}
            pageSize={paginationState.pageSize}
            currentPage={paginationState.currentPage}
            totalPages={paginationState.totalPages}
            loading={loading}
        />
    )
}
