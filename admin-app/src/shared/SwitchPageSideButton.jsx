import React from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SwitchPageSideButton({
    switchPage,
    disabled,
    direction
}) {
    let icon;
    icon = faChevronRight
    if (direction === "left") {
        icon = faChevronLeft
    }

    return (
        disabled ?
        <button className="bg-dark-cyan rounded-full h-max px-3 py-2" disabled>
            <FontAwesomeIcon icon={icon} className="text-gray-500"/>
        </button>
        :
        (<button className="bg-dark-cyan hover:bg-xdark-cyan rounded-full h-max px-3 py-2" onClick={() => switchPage()}>
            <FontAwesomeIcon icon={icon}/>
        </button>)
    )
}
