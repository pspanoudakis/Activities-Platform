import React from "react";
import { Link } from "react-router-dom";

export function TileButton(props) {

    return (
        props.isLink ?
        <Link
            to={props.path}
            className={`
                ${props.bgColor}
                ${props.hoverColor}
                duration-200
                ${props.fontColor}
                rounded-3xl
                ${props.padding}
                ${props.stretch ? "flex-1" : "w-max h-max"}
                shadow-md
            `}
        >
            { props.children }
        </Link>
        :
        <button
            type="button"
            style={{cursor: "pointer"}}
            className={`
                ${props.bgColor}
                ${props.hoverColor}
                duration-200
                ${props.fontColor}
                rounded-3xl
                ${props.padding}
                ${props.stretch ? "flex-1" : "w-max h-max"}
                shadow-md
            `}
            onClick={props.callback}
        >
            { props.children }
        </button>
    )
}
