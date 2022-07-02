import React, { useContext, useState } from "react"
import { AppContext } from "../AppContext"
import { FormActionButton } from "./FormActionButton"
import { SearchInputField } from "./SearchInputField"

export function FindUserForm() {

    const [inputText, setInputText] = useState('')
    const context = useContext(AppContext)

    function closeModalAndNavigate(dest) {
        context.setState({
            ...context.state,
            showModal: false,
            modalContent: null
        })
        // This might be risky...
        //context.state.navigate(dest)
        window.location.href = dest
    }

    return (
        <div className="flex flex-col gap-2 text-2xl">
            <SearchInputField
                value={inputText}
                setValue={setInputText}
                classExtra="bg-gray-200 font-thin"
            />
            <FormActionButton
                text='Αναζήτηση Χρήστη'
                action={() => closeModalAndNavigate(`/users?searchKey=${inputText}`)}
            />
        </div>
    )
}
