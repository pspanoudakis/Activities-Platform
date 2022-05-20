import React from "react";

export function TileButton(props) {

    const buttonStyle = {}
    if (props.isLink) {
        buttonStyle.cursor = "pointer"
    }

    return (
        <button
            type="button"
            className={`
                ${props.bgColor}
                ${props.hoverColor}
                duration-200
                ${props.fontColor}
                rounded-3xl
                ${props.padding}
                ${props.stretch ? "flex-1" : "w-max h-max"}
                shadow-md`}
            style={buttonStyle}
            onClick={props.callback}
        >
            { props.children }
        </button>
    )
}
