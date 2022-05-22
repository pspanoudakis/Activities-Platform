import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchUserResults, SEARCH_BY_ID, SEARCH_BY_NAME } from '../api';
import { UserResultsTable } from '../components/UserResultsTable';

export function UserSearch() {

    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState([])

    const [searchParams] = useSearchParams();

    const searchBy = searchParams.get('searchBy')
    const key = searchParams.get('key')

    const isSearchValid = () => (searchBy === SEARCH_BY_ID || searchBy === SEARCH_BY_NAME)
    const fetchResultsAndUpdate = () => {
        fetchUserResults(searchBy, key, (results) => {
            setResults(results)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (loading) {
            if (isSearchValid() && key) {
                fetchResultsAndUpdate()
            }
            else {
                setLoading(false)
            }
        }
    }, [loading])

    useEffect(() => {
        setLoading(true)
        if (isSearchValid() && key) {
            fetchResultsAndUpdate()
        }
        else {
            setResults([])
            setLoading(false)
        }
    }, [searchParams])

    return (
        loading ?
        <span>Loading...</span>
        :
        <UserResultsTable results={results}/>
    )
}
