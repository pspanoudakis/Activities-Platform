import React from "react"

export function PageTitle(props) {
    return (
        <span className="font-light text-4xl text-center px-2">
            {props.children}
        </span>
    )
}
