import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchUserResultsPage } from '../api';
import { PageTitle } from '../components/PageTitle';
import { UserResultsTable } from '../components/UserResultsTable';

const defaultPaginationState = {
    currentPage: 0,
    pageSize: 8,
    totalPages: -1
}

export function UserSearch() {

    const [searchParams] = useSearchParams();
    const searchKey = searchParams.get('searchKey')

    const [paginationState, setPaginationState] = useState(defaultPaginationState)
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const fetchIdRef = useRef(0)

    const updateResults = (newPage, newPageSize) => {
        //console.log('table requests update')
        setPaginationState({
            ...paginationState,
            currentPage: newPage,
            pageSize: newPageSize
        })
    }

    const fetchPageAndRerender = () => {
        const fetchId = ++fetchIdRef.current

        fetchUserResultsPage(searchKey, paginationState.currentPage, paginationState.pageSize, (response) => {
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
            fetchPageAndRerender()
        }
    }, [loading])

    useEffect(() => {
        setLoading(true)
    }, [searchParams, paginationState.currentPage, paginationState.pageSize])

    return (
        <div className="pt-6 w-full flex flex-col items-center gap-7 pb-7">
            <PageTitle>
                {`Αναζήτηση χρήστη: '${searchKey}'`}
            </PageTitle>
            <UserResultsTable
                results={results}
                updateResults={updateResults}
                pageSize={paginationState.pageSize}
                currentPage={paginationState.currentPage}
                totalPages={paginationState.totalPages}
                loading={loading}
            />
        </div>
    )
}
