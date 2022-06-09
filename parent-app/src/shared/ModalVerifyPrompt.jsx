import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";

export function ModalVerifyPrompt({
    onVerify,
    text
}) {

    const [loading, setLoading] = useState(false)

    function proceed() {
        setLoading(true)
        onVerify()
    }

    return (
        <div className="flex flex-col gap-4 px-4 pb-4 text-2xl font-light relative">
            <FontAwesomeIcon icon={faCircleQuestion} color="gray" size="3x"/>
            <span className="text-center">{text}</span>
            <div className="flex flex-row justify-end">
                <button className="bg-green-600 hover:bg-green-600 text-white text-lg rounded-2xl py-2 px-8" onClick={proceed}>
                    Επιβεβαίωση
                </button>
            </div>
            {
                loading ?
                <LoadingIndicator customColor="bg-white/75" stretchParent={true}/>
                :
                null
            }
        </div>
    )
}
