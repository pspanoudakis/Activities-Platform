import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function CategoryFamilyChecklist({
    mainName,
    selections,
    updateSelections
}) {

    //console.log('selections', selections)

    const [isOpen, setIsOpen] = useState(false)

    const toggleMain = () => {
        const newSelections = {
            isSelected: !selections.isSelected,
            subcategories: {}
        }
        for (const subcategory of Object.keys(selections.subcategories)) {
            newSelections.subcategories[subcategory] = false
        }
        //console.log(newSelections);
        updateSelections(mainName, newSelections)
    }

    const toggleSub = (subcategoryName) => {
        updateSelections(mainName, {
            ...selections,
            subcategories: {
                ...selections.subcategories,
                [subcategoryName]: !selections.subcategories[subcategoryName]
            }
        })
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full flex flex-row gap-2 items-center">
                <input type="checkbox" checked={selections.isSelected} onChange={toggleMain}/>
                <button className="flex flex-row gap-2 items-center" onClick={() => setIsOpen(!isOpen)}>
                    <span>{mainName}</span>
                    <FontAwesomeIcon className="duration-150" icon={faCaretDown} rotation={isOpen ? 180 : 0}/>
                </button>
            </div>
            {
                isOpen ?
                <div className="flex flex-col gap-2 pl-6">
                {
                    Object.keys(selections.subcategories).map((sname, i) => {
                        return (
                            <div key={i} className="w-32 flex flex-row gap-1 items-center text-sm">
                                <input type="checkbox" checked={selections.subcategories[sname]} onChange={() => toggleSub(sname)}/>
                                <span>This is {sname}</span>
                            </div>
                        )
                    })
                }
                </div>
                :
                null
            }
            
        </div>
    )
}

function CategoryPicker({
    selections,
    setSelections
}) {

    const updateSelections = (mainCategory, categorySelections) => {
        setSelections({
            ...selections,
            [mainCategory]: categorySelections
        })
    }
    
    return (
        <>
            <span className="font-semibold">Κατηγορίες</span>
        {
            Object.keys(selections).map((mainCategory, i) => {
                return (
                    <CategoryFamilyChecklist
                        key={i}
                        mainName={mainCategory}
                        selections={selections[mainCategory]} 
                        updateSelections={updateSelections}
                    />
                )
            })
        }
        </>
    )

}

export function SearchFiltersWrapper({
    keepOpen,
    setOpen,
    isOpen,
    options,
    setOptions
}) {
    
    const setOptionsProperty = (propertyName, newValue) => {
        setOptions({
            ...options,
            [propertyName]: newValue
        })
    }
    
    return (
        <div
            className={`
                flex flex-col justify-start items-center gap-4
                bg-dark-cyan rounded-xl
                ${keepOpen ? 'w-72 py-8 h-full' : `w-full py-2 ${isOpen ? 'pb-4 h-96 overflow-y-scroll' : ''}` } 
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
            <div className="flex flex-col gap-3 w-48 items-start px-2">
                <CategoryPicker
                    selections={options.categories}
                    setSelections={(newValue) => setOptionsProperty('categories', newValue)}
                />
                <span>Filter1</span>
                <span>Filter1</span>
                <span>Filter1</span>
                <span>Filter1</span>
            </div>
            :
            null
        }            
        </div>
    )

}
