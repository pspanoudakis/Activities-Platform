import React from 'react'

export function FormInputField({
    type,
    value,
    setValue,
    classExtra,
    placeholder,
    labelFor,
    labelText
}) {
    
    return (
        <>
            {
                labelFor ?
                <label htmlFor={labelFor}>{labelText}</label>
                :
                null
            }
            <input
                type={type ? type : "text"}
                className={`rounded-lg px-5 py-2 ${classExtra}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder ? placeholder : ""}
            />
        </>
    )
}

export function FormFieldHint({text, skipHint}) {
    return (
        <div className="flex flex-row justify-start items-center gap-3 text-sm" style={{minHeight: '3em'}}>
            {
                skipHint ?
                null
                :
                <span className="w-52">
                    {text}
                </span>
            }
        </div>
    )
}

export function FormFieldWithHint({
    type,
    value,
    setValue,
    labelFor,
    labelText,
    placeholder,
    hintText,
    skipHint
}) {

    return (
        <div className="flex flex-col gap-1">
            <FormInputField
                labelFor={labelFor}
                labelText={labelText}
                type={type}
                value={value}
                setValue={setValue}
                classExtra="shadow-md p-4"
                placeholder={placeholder}
            />
            <FormFieldHint skipHint={skipHint} text={hintText} />
        </div>
    )
}
