import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function ModalResultMessage({
    success,
    text
}) {
    return (
        success ?
        (<div className="flex flex-col gap-4 px-4 pb-4 text-2xl font-light">
            <FontAwesomeIcon icon={faCircleCheck} color="green" size="3x"/>
            <span className="text-center">{text}</span>
        </div>)
        :
        (<div className="flex flex-col gap-4 px-4 pb-4 text-2xl font-light">
            <FontAwesomeIcon icon={faCircleXmark} color="red" size="3x"/>
            <span className="text-center">{text}</span>
        </div>)
    )
}
