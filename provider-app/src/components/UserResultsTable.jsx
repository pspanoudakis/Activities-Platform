import React from 'react'
import { UserResultRow } from "./UserResultRow";

export function UserResultsTable(props) {
    return (
        props.results.length > 0 ?
        <div>
            {props.results.map((r, i) => <UserResultRow key={i} item={r}/>)}
        </div>
        :
        <div>NoResults</div>
    )
}