import React from 'react'

export function UserResultRow(props) {
    return (
        <div className='flex flex-col'>
            <span>{props.item.username}</span>
        </div>
    )
}