import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useToggleBodyScroll } from "./useToggleBodyScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CloseModalButton(props) {
    return (
        <button onClick={() => props.onClick()}>
            <FontAwesomeIcon icon={faXmark} size="lg"/>
        </button>
    )
}

export function Modal(props) {
    useToggleBodyScroll(!props.show)

    const color = 'bg-white'
    return (
        props.show ?
        <>
            <div onClick={() => props.closeCallback()} className='bg-black bg-opacity-25 fixed top-0 bottom-0 right-0 left-0 z-40'/>
            <div className={`flex flex-col gap-4 py-4 px-5 ${color} rounded-xl fixed top-20 left-0 right-0 max-w-full w-max mx-auto z-50`}>
                <div className="flex justify-end">
                    <CloseModalButton onClick={() => props.closeCallback()}/>
                </div>
                <div className={`w-fit flex justify-center`}>
                    { props.children }
                </div>
            </div>
        </>
        :
        null
    )
}
