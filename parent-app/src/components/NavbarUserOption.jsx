import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export function NavbarUserOption({
    url,
    hoverColor,
    padding,
    children
}) {
    return (
        <Link to={/* Link to card top-up page */url} className="flex-1">
            <div className={`w-full flex flex-row gap-2 items-center rounded-2xl px-4 ${hoverColor} duration-200 ${padding}`}>
                {children}
            </div>
        </Link>
    )
}
