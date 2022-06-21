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

    const [isOpen, setIsOpen] = useState(false)

    const updateSelections = (mainCategory, categorySelections) => {
        setSelections({
            ...selections,
            [mainCategory]: categorySelections
        })
    }
    
    return (
        <div className="flex flex-col gap-3 w-full items-start">
            <button className="flex flex-row gap-2 items-center" onClick={() => setIsOpen(!isOpen)}>
                <span className="font-semibold text-lg">Κατηγορίες</span>
                <FontAwesomeIcon className="duration-150" icon={faCaretDown} rotation={isOpen ? 180 : 0}/>
            </button>
        {
            isOpen ?
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
            :
            null
        }
        </div>
    )
}

function AgeCategoryPicker({
    selections,
    setSelections
}) {

    const changeAgeCategory = (idx) => {
        setSelections(selections.map((category, i) => {
            return {
                name: category.name,
                isSelected: i === idx
            }
        }))
    }
    
    return (
        <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg">Ηλικία</span>
        {
            selections.map((ageCategory, i) => {
                return (
                    <div key={i} className="flex flex-row gap-2 items-center">
                        <input type="radio" name={`ageCategory${i}`} checked={ageCategory.isSelected} onChange={() => changeAgeCategory(i)}/>
                        <label htmlFor={`ageCategory${i}`} onClick={() => changeAgeCategory(i)}>{ageCategory.name}</label>
                    </div>
                )
            })
        }
        </div>
    )
}

function PriceRangePicker({
    selections,
    setSelections
}) {

    const [minPrice, setMinPrice] = useState(selections[0])
    const [maxPrice, setMaxPrice] = useState(selections[1])

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
                <span className="font-semibold text-lg">Εύρος Τιμής</span>
                {
                    (minPrice !== selections[0] || maxPrice !== selections[1]) ?
                    <button className="h-max w-max text-xs font-semibold bg-navbar-cyan py-1 px-2 rounded-3xl" onClick={() => setSelections([minPrice, maxPrice])}>
                        Εφαρμογή
                    </button>
                    :
                    null
                }
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm">Από</span>
                <input className="w-20 rounded-xl py-1 px-2" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                <span className="text-sm">Έως</span>
                <input className="w-20 rounded-xl py-1 px-2" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
            </div>
        </div>
    )
}

function DateRangePicker({
    selections,
    setSelections
}) {
    const [startDate, setStartDate] = useState(selections[0])
    const [endDate, setEndDate] = useState(selections[1])

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
                <span className="font-semibold text-lg">Διεξαγωγή</span>
                {
                    (startDate !== selections[0] || endDate !== selections[1]) ?
                    <button className="h-max w-max text-xs font-semibold bg-navbar-cyan py-1 px-2 rounded-3xl" onClick={() => setSelections([startDate, endDate])}>
                        Εφαρμογή
                    </button>
                    :
                    null
                }
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm">Από</span>
                <input className="w-max rounded-xl py-1 px-2" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <span className="text-sm">Έως</span>
                <input className="w-max rounded-xl py-1 px-2" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
        </div>
    )
}

function MaxDistancePicker ({
    selection,
    setSelection
}) {

    const [value, setValue] = useState(selection)
    
    return (
        <div className="flex flex-col gap-2">
            <div className="font-semibold text-lg">
                Μεγ. Απόσταση από διεύθυνση
                {
                    value !== selection ?
                    <button className="ml-3 h-max w-max text-xs font-semibold bg-navbar-cyan py-1 px-2 rounded-3xl" onClick={() => setSelection(value)}>
                        Εφαρμογή
                    </button>
                    :
                    null
                }
            </div>
            
            <div className="flex flex-row gap-2 items-center">
                <input className="w-20 rounded-xl py-1 px-2" type="number" value={value} onChange={e => setValue(e.target.value)} />
                <span className="w-full text-sm">km</span>
            </div>
            
            
        </div>
    )
}

export function SearchFiltersWrapper({
    keepOpen,
    setOpen,
    isOpen,
    options,
    setOptions
}) {

    const filterSetter = (propertyName) => ( (newValue) => {
        setOptions({
            ...options,
            [propertyName]: newValue
        })
    } )
    
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
            <div className="flex flex-col gap-3 w-48 items-start px-1">
                <CategoryPicker
                    selections={options.categories}
                    setSelections={filterSetter('categories')}
                />
                <AgeCategoryPicker
                    selections={options.ageCategories}
                    setSelections={filterSetter('ageCategories')}
                />
                <PriceRangePicker
                    selections={options.priceRange}
                    setSelections={filterSetter('priceRange')}
                />
                <DateRangePicker
                    selections={options.dateRange}
                    setSelections={filterSetter('dateRange')}
                />
                <MaxDistancePicker
                    selection={options.maxDistance}
                    setSelection={filterSetter('maxDistance')}
                />
            </div>
            :
            null
        }            
        </div>
    )

}
