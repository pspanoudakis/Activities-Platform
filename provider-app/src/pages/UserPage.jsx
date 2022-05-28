import React from 'react'
import { useParams } from 'react-router-dom'

export function UserPage(props) {

    const params = useParams()

    return (
        <div>User {params.userId}</div>
    )
}
