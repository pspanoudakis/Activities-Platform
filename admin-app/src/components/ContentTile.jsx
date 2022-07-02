import React from "react";

export function ContentTile(props) {

    return (
        <div
            className={`
                ${props.bgColor}
                rounded-3xl
                ${props.padding}
                ${props.stretch ? "flex-1" : props.dimensions}`}
            style={{
                boxShadow: '0 0 10px rgb(214 214 214)'
            }}
        >
            { props.children }
        </div>
    )
}
