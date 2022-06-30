import React, { useMemo, useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CategoryFamilyChecklist({
    mainName,
    selections,
    updateSelections
}) {

    const [isOpen, setIsOpen] = useState(false)

    const subcategoryNames = useMemo(() => Object.keys(selections.subcategories), [selections.subcategories])

    const toggleMain = () => {
        const newSelections = {
            isSelected: !selections.isSelected,
            subcategories: {}
        }
        for (const subcategory of subcategoryNames) {
            newSelections.subcategories[subcategory] = false
        }
        updateSelections(mainName, newSelections)
    }

    const toggleSub = (subcategoryName) => {
        updateSelections(mainName, {
            isSelected: false,
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
                <button
                    className="flex flex-row gap-2 items-center"
                    onClick={() => {
                        if (subcategoryNames.length > 0) {
                            setIsOpen(!isOpen)
                        }
                        else {
                            toggleMain()
                        }
                    }}
                >
                    <span>{mainName}</span>
                {
                    subcategoryNames.length > 0 ?
                    <FontAwesomeIcon className="duration-150" icon={faCaretDown} rotation={isOpen ? 180 : 0}/>
                    :
                    null
                }
                </button>
            </div>
            {
                (subcategoryNames.length > 0) && isOpen ?
                <div className="flex flex-col gap-2 pl-6">
                {
                    subcategoryNames.map((sname, i) => {
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
                id: category.id,
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

function DistrictPicker({
    selections,
    setSelections
}) {

    const districtNames = useMemo(() => Object.keys(selections), [selections])

    const selectedDistrict = useMemo(() => {
        return districtNames.find(name => selections[name]) ?? ''
    }, [selections])

    const updateSelection = (newSelection) => {
        setSelections(districtNames.reduce((stored, name) => {
            return {
                ...stored,
                [name]: name === newSelection
            }
        }, {}))
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg">Περιοχή</span>
            <select className="py-1 px-2 rounded-xl outline-none" value={selectedDistrict} onChange={(e) => updateSelection(e.target.value)}>
                <option className="text-gray-500 italic" value="">{selectedDistrict === '' ? 'Επιλέξτε...' : 'Επαναφορά...'}</option>
            {
                districtNames.map((d, i) => {
                    return (<option key={i} value={d}>{d}</option>)
                })
            }
            </select>
        </div>
    )    
}

function MinRatingPicker({
    selections,
    setSelections
}) {
    
    const selectedRate = useMemo(() => {
        return selections.findIndex(v => v)
    }, [selections])

    const updateSelection = (idx) => {
        setSelections( selections.map((r, i) => i === idx) )
    }
    
    return (
        <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg">Αξιολόγηση</span>
            <select
                className="py-1 px-2 rounded-xl outline-none w-32"
                value={selectedRate > -1 ? selectedRate : ''}
                onChange={(e) => updateSelection(parseInt(e.target.value))}
            >
                <option className="text-gray-500 italic" value="">{selectedRate === -1 ? 'Επιλέξτε...' : 'Επαναφορά...'}</option>
            {
                selections.map((_, r) => {
                    return (<option key={r} value={r}>{r + 1}+ αστέρια</option>)
                })
            }
            </select>
        </div>
    )

}

function MaxDistancePicker ({
    selections,
    setSelections
}) {

    const [value, setValue] = useState(selections)
    
    return (
        <div className="flex flex-col gap-2">
            <div className="font-semibold text-lg">
                Μεγ. Απόσταση από διεύθυνση
                {
                    value !== selections ?
                    <button className="ml-3 h-max w-max text-xs font-semibold bg-navbar-cyan py-1 px-2 rounded-3xl" onClick={() => setSelections(value)}>
                        Εφαρμογή
                    </button>
                    :
                    null
                }
            </div>
            
            <div className="flex flex-row gap-2 items-center">
                <input className="w-16 rounded-xl py-1 px-2" type="number" value={value} onChange={e => setValue(e.target.value)} />
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
    setOptions,
    updateCategories
}) {

    const filterSetter = (propertyName) => ( (newValue) => {
        setOptions({
            ...options,
            [propertyName]: newValue
        })
    } )

    const changeCategories = (newSelections) => {
        const selected = []
        for (const category in newSelections) {
            if (newSelections[category].isSelected) {
                selected.push(category)
            }
            else {
                for (const subcategory in newSelections[category].subcategories) {
                    if (newSelections[category].subcategories[subcategory]) {
                        selected.push(subcategory)
                    }
                }
            }
        }
        updateCategories(JSON.stringify(selected))
    }
    
    return (
        <div
            className={`
                flex flex-col justify-start gap-4
                bg-dark-cyan rounded-xl
                ${keepOpen ? 'w-72 pl-4 py-8 h-screen overflow-y-auto items-start' : `items-center w-full py-2 ${isOpen ? 'pb-4 h-96 overflow-y-scroll' : ''}` } 
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
            <div className={`flex flex-col gap-3 w-48 items-start pl-1`}>
                <CategoryPicker
                    selections={options.categories}
                    setSelections={changeCategories}
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
                <MinRatingPicker
                    selections={options.minRating}
                    setSelections={filterSetter('minRating')}
                />
                <DistrictPicker
                    selections={options.districts}
                    setSelections={filterSetter('districts')}
                />
                <MaxDistancePicker
                    selections={options.maxDistance}
                    setSelections={filterSetter('maxDistance')}
                />
            </div>
            :
            null
        }            
        </div>
    )

}
