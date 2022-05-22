import React from 'react'

export function FormActionButton(props) {
    const color = 'bg-cyan hover:bg-dark-cyan'
    return (
        <button
            style={{maxWidth: '90vw'}}
            className={`${color} rounded-3xl px-4 py-1 font-thin`}
            onClick={() => props.action()}
        >
            {props.text}
        </button>
    )
}
