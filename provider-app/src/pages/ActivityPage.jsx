import React from 'react'
import { useParams } from 'react-router-dom'

export function ActivityPage(props) {

    const params = useParams()

    return (
        <div>Activity {params.activityId}</div>
    )
}
