import React from 'react'
//import { Link } from 'react-router-dom'

export function FormActionButton(props) {
    const color = 'bg-cyan hover:bg-dark-cyan'
    return (
        /* props.isLink ?
        <Link
            style={{maxWidth: '90vw'}}
            className={`${color} rounded-3xl px-4 py-1 font-thin`}
            to={props.path}
        >
            {props.text}
        </Link>
        : */
        <button
            style={{maxWidth: '90vw'}}
            className={`${color} rounded-3xl px-4 py-1 font-thin`}
            onClick={() => props.action()}
        >
            {props.text}
        </button>
    )
}
