import React from 'react'

export function FormInputField({
    type,
    value,
    setValue,
    classExtra,
    placeholder
}) {
    
    return (
        <input
            style={{maxWidth: '90vw'}}
            type={type ? type : "text"}
            className={`rounded-3xl px-4 py-1 mb-4 ${classExtra}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder ? placeholder : ""}
        />
    )
}
