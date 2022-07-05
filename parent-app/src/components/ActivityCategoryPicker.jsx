import React, { useState, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchCategories } from "../api/searchAPI";
import { useHasMaxWidth } from "../hooks/useHasMaxWidth";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { SectionTitle } from "../shared/SectionTitle"

function CategoryButton({
    categoryName,
    categoryImg,
    callback
}) {
    return (
        <button
            className="
                duration-200
                flex flex-row gap-3 justify-start items-center
                rounded-xl py-2 px-6
                bg-white
                hover:bg-light-cyan
            "
            onClick={callback}
        >
            <div
                className="rounded-full"
                style={{
                    width: `${/* mdDevice ? '8rem' :  */'6rem'}`,
                    height: `${/* mdDevice ? '8rem' :  */'6rem'}`,
                    backgroundImage: `url('${categoryImg}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            />
            <span className="text-lg font-semibold">{categoryName}</span>
        </button>
    )
}

export function ActivityCategoryPicker() {

    const mdDevice = useHasMaxWidth(600)

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState({})
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        fetchCategories(true).then(response => {
            if (response.ok) {
                //console.log(response.data)
                setCategories(response.data)
                setLoading(false)
            }
            else {
                console.log('Failed to fetch available categories');
            }
        })
    }, [])

    function searchCategory(categoryName) {
        const categoriesParam = []
        categoriesParam.push(categoryName)
        navigate({
            pathname: '/searchActivity',
            search: createSearchParams({
                categories: JSON.stringify([categoryName])
            }).toString()
        })
    }

    function categorySelected(categoryName) {
        if (categories[categoryName] && categories[categoryName].children) {
            setSelectedCategory(categoryName)
        }
        else {
            searchCategory(categoryName)
        }
    }

    
    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionTitle>
                Αναζητήστε μια δραστηριότητα
            </SectionTitle>
            <div
                className="flex flex-col gap-2 rounded-xl bg-cyan w-full px-5 py-4 justify-start overflow-y-auto relative"
                style={{
                    height: '45vh'
                }}
            >
            {
                loading ?
                <LoadingIndicator stretchParent={true} customColor='transparent'/>
                : (
                    selectedCategory ?
                    <>
                    <div className="w-full flex justify-start">
                        <button
                            className="flex gap-2 rounded-2xl px-3 py-1 hover:bg-navbar-cyan items-center"
                            onClick={() => setSelectedCategory(null)}    
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                            <span>Κύριες Κατηγορίες</span>
                        </button>
                    </div>
                    <div className={`${mdDevice ? 'flex flex-col' : 'grid grid-cols-2'} gap-3`}>
                    {
                        Object.keys(categories[selectedCategory].children).map((subcategory, i) => 
                            <CategoryButton
                                key={i}
                                categoryName={subcategory}
                                categoryImg={categories[selectedCategory].children[subcategory]}
                                callback={() => categorySelected(subcategory)}
                            />
                        )
                    }
                    </div>
                    <div className="w-full flex justify-center">
                        <button
                            className="w-max py-2 px-3 rounded-2xl bg-navbar-light-cyan hover:bg-navbar-cyan"
                            onClick={() => searchCategory(selectedCategory)}
                        >
                            {`Όλα στην κατηγορία "${selectedCategory}"`}
                        </button>
                    </div>
                    </>
                    :
                    <>
                    <div className={`${mdDevice ? 'flex flex-col' : 'grid grid-cols-2'} gap-3`}>
                    {
                        Object.keys(categories).map((mainCategory, i) => 
                            <CategoryButton
                                key={i}
                                categoryName={mainCategory}
                                categoryImg={categories[mainCategory].img}
                                callback={() => categorySelected(mainCategory)}
                            />
                        )
                    }
                    </div>
                    </>
                )
            }
            </div>
        </div>
    )
}
