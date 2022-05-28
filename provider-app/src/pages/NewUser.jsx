import React, { useState } from "react";
import { FormInputField } from "../components/FormInputField";

export function NewUser() {

    const [uname, setUname] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [verifyPwd, setVerifyPwd] = useState('')
    const [role, setRole] = useState('parent')

    const submitForm = (e) => {
        e.preventDefault()

        console.log({
            uname: uname,
            email: email,
            pwd: uname
        })
    }

    const canSubmitForm = () => {
        return (pwd === verifyPwd && uname.length > 0 && email.length > 0)
    }

    const checkUsername = () => {
        return uname.length >= 0
    }

    const checkPassword = () => {
        return pwd.length >= 8 && pwd === verifyPwd
    }

    const fieldClassExtra = "shadow-md p-4"

    return (
        <div className="pt-6 w-full flex flex-col items-center gap-7 text-lg">
            <span className="font-light text-4xl">
                Δημιουργία Νέου Χρήστη
            </span>
            <form onSubmit={submitForm}>
                <div className="grid grid-cols-2 grid-rows-3 gap-x-20 gap-y-5 rounded-lg bg-xlight-cyan px-20 py-8">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="uname">Όνομα Χρήστη</label>
                        <FormInputField
                            value={uname}
                            setValue={setUname}
                            classExtra={fieldClassExtra}
                            placeholder="Όνομα Χρήστη"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <FormInputField
                            value={email}
                            setValue={setEmail}
                            classExtra={fieldClassExtra}
                            placeholder="Email"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="pwd">Κωδικός Πρόσβασης</label>
                        <FormInputField
                            type="password"
                            value={pwd}
                            setValue={setPwd}
                            classExtra={fieldClassExtra}
                            placeholder="Κωδικός"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="verifyPwd">Επιβεβαίωση Κωδικού</label>
                        <FormInputField
                            type="password"
                            value={verifyPwd}
                            setValue={setVerifyPwd}
                            classExtra={fieldClassExtra}
                            placeholder="Επιβεβαίωση Κωδικού"
                        />
                    </div>
                    <div className="flex justify-center col-span-2">
                        {
                            canSubmitForm() ?
                            <button
                                type="submit"
                                className={`
                                    bg-dark-cyan
                                    hover:bg-xdark-cyan
                                    duration-150
                                    h-max
                                    px-5 py-2
                                    rounded-xl
                                    border-dark-cyan border-4
                                `}>
                                Δημιουργία Χρήστη
                            </button>
                            :
                            <button
                                className={`
                                    bg-gray-200
                                    duration-150
                                    h-max
                                    px-5 py-2
                                    rounded-xl 
                                    border-dark-cyanborder-4
                                `}
                                disabled>
                                Δημιουργία Χρήστη
                            </button>
                        }
                        
                    </div>
                </div>
            </form>
        </div>
    )    
}
