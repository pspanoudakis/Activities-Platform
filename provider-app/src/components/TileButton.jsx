import React from "react";

export function TileButton(props) {

    const buttonStyle = {}
    if (props.isLink) {
        buttonStyle.cursor = "pointer"
    }

    return (
        <button
            type="button"
            className={`${props.bgColor} rounded-xl p-2 ${props.stretch ? "flex-1" : "w-max h-max"} shadow-md`}
            style={buttonStyle}
            onClick={props.callback}
        >
            { props.content }
        </button>
    )
}
