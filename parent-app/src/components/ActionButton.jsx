import React from "react"

export function ActionButton({
    text,
    onClick,
    disabled
}) {
    return (
        <button
            className="text-sm rounded-xl bg-navbar-cyan hover:bg-navbar-dark-cyan h-max py-1 px-3 disabled:bg-dark-cyan disabled:text-gray-500"
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    )
}
