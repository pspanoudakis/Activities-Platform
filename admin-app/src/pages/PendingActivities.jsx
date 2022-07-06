import React, { useState, useEffect } from 'react'
import { fetchPendingActivities } from '../api/activitiesAPI'
import { ActivityResultsTable } from '../components/ActivityResultsTable'
import { PageTitle } from '../components/PageTitle'

const defaultPaginationState = {
    currentPage: 0,
    pageSize: 8,
    totalPages: -1
}

export function PendingActivities() {

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

        fetchPendingActivities(paginationState.currentPage + 1, paginationState.pageSize, (response) => {

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
    }, [paginationState.currentPage, paginationState.pageSize])

    return (
        <div className="pt-6 w-full flex flex-col items-center gap-7 pb-7">
            <PageTitle>
                Δραστηριότητες προς έγκριση
            </PageTitle>
            <ActivityResultsTable
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
