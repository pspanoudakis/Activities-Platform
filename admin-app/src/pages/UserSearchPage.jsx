import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchUsers } from '../api/usersAPI';
import { PageTitle } from '../components/PageTitle';
import { UserResultsTable } from '../components/UserResultsTable';

const defaultPaginationState = {
    currentPage: 0,
    pageSize: 8,
    totalPages: -1
}

export function UserSearchPage() {

    const [searchParams] = useSearchParams();
    const searchKey = searchParams.get('searchKey')

    const [paginationState, setPaginationState] = useState(defaultPaginationState)
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])

    const updateResults = (newPage, newPageSize) => {
        setPaginationState({
            ...paginationState,
            currentPage: newPage,
            pageSize: newPageSize
        })
    }

    const fetchPageAndRerender = () => {

        fetchUsers(searchKey, paginationState.currentPage + 1, paginationState.pageSize, (response) => {

            if (response.ok) {
                console.log(response.data)
                setResults(response.data.page)
                setPaginationState({
                    ...paginationState,
                    totalPages: response.data.total_pages
                })
            }
            setLoading(false)
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
