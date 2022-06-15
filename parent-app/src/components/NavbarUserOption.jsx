import React from "react";
import { Link } from "react-router-dom";

export function NavbarUserOption({
    isLink,
    url,
    callback,
    hoverColor,
    padding,
    children
}) {

    if (isLink) {
        return (
            <Link to={url} className="flex-1">
                <div className={`w-full flex flex-row gap-2 items-center rounded-2xl px-4 ${hoverColor} duration-200 ${padding}`}>
                    {children}
                </div>
            </Link>
        )
    }
    return (
        <button
            className={`flex flex-row gap-2 items-center rounded-2xl px-4 ${hoverColor} duration-200 ${padding}`}
            onClick={callback}
        >
            {children}
        </button>
    )
}
