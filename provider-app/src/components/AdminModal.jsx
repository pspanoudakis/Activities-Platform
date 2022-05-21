import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useToggleBodyScroll } from "../hooks/useToggleBodyScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CloseModalButton(props) {
    return (
        <button onClick={() => props.onClick()}>
            <FontAwesomeIcon icon={faXmark} size="lg"/>
        </button>
    )
}

export function AdminModal(props) {
    useToggleBodyScroll(!props.show)

    const color = 'bg-cyan'
    return (
        props.show ?
        <>
            <div onClick={() => props.closeCallback()} class='bg-black bg-opacity-25 fixed top-0 bottom-0 right-0 left-0 z-40'></div>
            <div className={`flex flex-col gap-8 py-4 px-5 ${color} rounded-xl fixed top-20 left-0 right-0 w-max mx-auto z-50`}>
                <div className="flex justify-end">
                    <CloseModalButton onClick={() => props.closeCallback()}/>
                </div>
                <div class={`w-max flex justify-center`}>
                    { props.children }
                </div>
            </div>
        </>
        :
        null
    )
}
