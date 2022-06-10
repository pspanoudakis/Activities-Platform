import React from "react";

export function ContentTile({
    bgColor,
    padding,
    stretch,
    dimensions,
    classExtra,
    children
}) {

    return (
        <div
            className={`
                ${bgColor}
                rounded-3xl
                ${padding}
                ${stretch ? "flex-1" : dimensions}
                ${classExtra}
            `}
            style={{
                // admin needs this
                //boxShadow: '0 0 10px rgb(214 214 214)'
            }}
        >
            { children }
        </div>
    )
}
