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
            type={type ? type : "text"}
            className={`rounded-lg px-5 py-2 ${classExtra}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder ? placeholder : ""}
        />
    )
}

export function FormFieldHint({text, skipHint}) {
    return (
        <div className="flex flex-row justify-start items-center gap-3 text-sm" style={{minHeight: '3em'}}>
            {
                skipHint ?
                null
                :
                <span className="w-60">
                    {text}
                </span>
            }
        </div>
    )
}
