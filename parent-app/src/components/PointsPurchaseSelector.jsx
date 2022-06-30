import React, { useState } from "react";
import { SectionTitle } from "../shared/SectionTitle";

export function PointsCard({
    points,
    price,
    isSelected,
    onSelect
}) {

    return (
        <button
            className={`
                w-48
                rounded-lg p-6 flex flex-col justify-between items-center 
                border-navbar-cyan border-2 ${isSelected ? 'bg-navbar-cyan text-white' : 'bg-white text-navbar-dark-cyan'}
            `}
            onClick={() => onSelect(isSelected ? '' : points)}
        >
            <span className="font-bold text-2xl">{points} πόντοι</span>
            <span className="font-bold text-lg">{price} €</span>
        </button>
    )

}

const purchaseOptions = [
    {
        points: '20',
        price: '10'
    },
    {
        points: '45',
        price: '20'
    },
    {
        points: '120',
        price: '50'
    }
]
export function PointsPurchaseSelector({
    onPurchase
}) {

    const [selectedOption, setSelectedOption] = useState('')

    return (
        <div className="flex flex-col gap-5 items-center py-7 border-b-navbar-dark-cyan border-b-2">
            <SectionTitle>
                Επέκταση Υπολοίπου
            </SectionTitle>
            <div className="flex flex-row gap-3 flex-wrap justify-center items-center">
            {
                purchaseOptions.map(({points, price}, i) =>
                    <PointsCard
                        key={i}
                        points={points} price={price}
                        isSelected={selectedOption === points} onSelect={points => setSelectedOption(points)}
                    />
                )
            }
            </div>
            <button
                className="rounded-lg px-3 py-2 bg-cyan hover:bg-navbar-cyan disabled:hover:bg-cyan disabled:text-gray-500"
                disabled={!selectedOption}
                onClick={() => onPurchase(selectedOption)}
            >
            {
                selectedOption ?
                `Αγορά ${selectedOption} πόντων`
                :
                'Δεν έχει επιλεγεί πακέτο για αγορά.'
            }
            </button>
        </div>
    )    
}
