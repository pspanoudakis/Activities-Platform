import React, { useMemo, useState } from "react";
import { FormInputField } from "../shared/FormUtils";
import { SectionTitle } from "../shared/SectionTitle";

function strToExpirationDate(str) {
    if (str) {
        const temp = str.split('-')
        return {
            month: temp[0],
            year: temp[1]
        }
    }

    return {
        month: '',
        year: ''
    }
}

function compareDates(a, b) {
    return a.month === b.month && a.year === b.year
}

export function CardInfoModifier({
    cardInfo,
    updateCardInfo
}) {

    const initialDate = useMemo(() => {
        return cardInfo ? strToExpirationDate(cardInfo.expirationDate) : strToExpirationDate('')
    }, [cardInfo])

    const [cardNumber, setCardNumber] = useState(cardInfo ? cardInfo.cardNumber : '')
    const [expirationDate, setExpirationDate] = useState(initialDate)

    // Note: backend names it 'ccv' instead of 'cvv'
    const [cvv, setCvv] = useState(cardInfo ? cardInfo.ccv : '')
    const [ownerName, setOwnerName] = useState(cardInfo ? cardInfo.ownerName : '')

    const cannotSave = useMemo(() => {
        if (cardNumber && expirationDate.month && expirationDate.year && cvv && ownerName) {
            if (cardInfo) {
                return (
                    cardNumber === cardInfo.cardNumber &&
                    compareDates(expirationDate, initialDate) &&
                    cvv === cardInfo.ccv &&
                    ownerName === cardInfo.ownerName
                )
            }
            return true
        }
        return false
    }, [cardInfo, cardNumber, expirationDate, cvv, ownerName])
    
    return (
        <div className="flex flex-col gap-5 items-center">
            <SectionTitle>
                Στοιχεία Κάρτας
            </SectionTitle>
            <div className={`flex flex-col gap-3`}>
                <div className="flex flex-col gap-2">
                    <FormInputField
                        labelFor="cardNumber"
                        labelText="Αριθμός Κάρτας"
                        placeholder="Αριθμός Κάρτας"
                        value={cardNumber}
                        setValue={setCardNumber}
                        classExtra="outline-none border focus:shadow-md focus:border-black border-gray-300 duration-200"
                    />
                </div>
                <div className="flex flex-row items-end gap-4">
                    <div className="flex flex-col gap-2">
                        <FormInputField
                            labelFor="cvv"
                            labelText="CVV"
                            placeholder="CVV"
                            value={cvv}
                            setValue={setCvv}
                            classExtra="outline-none border focus:shadow-md focus:border-black border-gray-300 w-20 duration-200"
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <span>Ημ. Λήξης</span>
                        <div className="flex flex-row gap-1 justify-start">
                            <FormInputField
                                placeholder="Μ"
                                value={expirationDate.month}
                                setValue={(v) => setExpirationDate({month: v, year: expirationDate.year})}
                                classExtra="outline-none border focus:shadow-md focus:border-black border-gray-300 w-16 duration-200"
                            />
                            <FormInputField
                                placeholder="Έτος"
                                value={expirationDate.year}
                                setValue={(v) => setExpirationDate({month: expirationDate.month, year: v})}
                                classExtra="outline-none border focus:shadow-md focus:border-black border-gray-300 w-20 duration-200"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2" style={{minWidth: '50%'}}>
                    <FormInputField
                        labelFor="ownerName"
                        labelText="Όνομα κατόχου"
                        placeholder="Όνομα κατόχου"
                        value={ownerName}
                        setValue={setOwnerName}
                        classExtra="outline-none border focus:shadow-md focus:border-black border-gray-300 duration-200"
                    />
                </div>
            </div>
            <button
                className={`px-4 py-2 rounded-xl ${cannotSave ? 'text-gray-500' : 'hover:bg-navbar-cyan'} bg-cyan`}
                disabled={cannotSave}
                onClick={() => updateCardInfo({
                    cardNumber,
                    cvv,
                    expirationDate: `${expirationDate.month}-${expirationDate.year}`,
                    ownerName
                })}
            >
                Ενημέρωση Στοιχείων
            </button>
        </div>
    )
}
