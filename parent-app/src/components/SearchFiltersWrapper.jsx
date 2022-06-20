import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function SearchFiltersWrapper({
    keepOpen,
    setOpen,
    isOpen,
    options,
    setOptions
}) {
    
    return (
        <div
            className={`
                flex flex-col justify-start items-center gap-4
                bg-dark-cyan rounded-xl
                ${keepOpen ? 'px-24 py-8 h-full' : `w-full py-2 ${isOpen ? 'pb-4' : ''}` } 
            `}
        >
        {
            !keepOpen ?
            <button className="underline" onClick={() => setOpen(!isOpen)}>
            {
                <div className="flex flex-row items-center justify-center gap-2 font-semibold">
                <FontAwesomeIcon className="duration-150" icon={faCaretDown} rotation={isOpen ? 180 : 0}/>
                {
                    isOpen ?
                    <span>Απόκρυψη Φίλτρων</span>
                    :
                    <span>Εμφάνιση Φίλτρων</span>
                }
                </div>
            }
            </button>
            :
            null
        }
        {
            isOpen ?
            <>
                <span>Filter1</span>
                <span>Filter1</span>
                <span>Filter1</span>
                <span>Filter1</span>
                <span>Filter1</span>
            </>
            :
            null
        }            
        </div>
    )

}
