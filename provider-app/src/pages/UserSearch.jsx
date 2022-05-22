import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchUserResults } from '../api';
import { UserResultsTable } from '../components/UserResultsTable';

const SEARCH_BY_ID = 'id'
const SEARCH_BY_NAME = 'name'

export function UserSearch() {

    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState([])

    const [searchParams] = useSearchParams();

    const searchBy = searchParams.get('searchBy')
    const key = searchParams.get('key')

    useEffect(() => {
        if (loading) {
            if ((searchBy === SEARCH_BY_ID || searchBy === SEARCH_BY_NAME) && key) {
                fetchUserResults(searchBy, key, (results) => {
                    setResults(results)
                    setLoading(false)
                })
            }
            else {
                setLoading(false)
            }
        }
    }, [loading])

    return (
        loading ?
        <span>Loading...</span>
        :
        <UserResultsTable results={results}/>
    )
}
