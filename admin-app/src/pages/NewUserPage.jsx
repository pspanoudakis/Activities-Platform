import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from '../AppContext';
import { FormFieldHint, FormInputField } from "../components/FormUtils";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { PageTitle } from "../components/PageTitle";
import { createUser } from "../api/usersAPI";

const USER_ROLES = {
    'ROLE_PARENT': 'Γονέας',
    'ROLE_SELLER': 'Πάροχος',
    'ROLE_ADMIN': 'Διαχειριστής',
}
export function NewUserPage() {

    const context = useContext(AppContext)
    const navigate = useNavigate()

    const [uname, setUname] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [verifyPwd, setVerifyPwd] = useState('')
    const [role, setRole] = useState(Object.keys(USER_ROLES)[0])

    const [loading, setLoading] = useState(false)

    const submitForm = e => {
        e.preventDefault()        
        setLoading(true)

        console.log({
            uname: uname,
            email: email,
            pwd: pwd,
            role: role
        })

        createUser(
            {
                username: uname,
                email: email,
                password: pwd,
                role: role
            },
            response => {
                // Maybe navigate to New User page here
                response.ok && navigate(`/users/${uname}`)
                context.setState({
                    ...context.state,
                    showModal: true,
                    modalContent: (
                        response.ok ?
                        <div className="flex flex-col gap-4 px-4 pb-4 text-2xl font-light">
                            <FontAwesomeIcon icon={faCircleCheck} color="green" size="3x"/>
                            {`Ο χρήστης '${uname}' δημιουργήθηκε επιτυχώς.`}
                        </div>
                        :
                        <div className="flex flex-col gap-4 px-4 pb-4 text-2xl font-light">
                            <FontAwesomeIcon icon={faCircleXmark} color="red" size="3x"/>
                            {`Σφάλμα δημιουργίας νέου χρήστη.`}
                        </div>
                    )
                })
            }
        )
    }

    const usernameOk = useMemo(() => {
        return uname.length > 0
    }, [uname])

    const emailOk = useMemo(() => {
        return email.length > 0
    }, [email])

    const pwdOk = useMemo(() => {
        return pwd.length >= 8
    }, [pwd])

    const verifyPwdOk = useMemo(() => {
        return pwd === verifyPwd
    }, [pwd, verifyPwd])

    const canSubmitForm = useMemo(() => {
        return (usernameOk && emailOk && pwdOk && verifyPwdOk)
    }, [usernameOk, emailOk, pwdOk, verifyPwdOk])

    const fieldClassExtra = "shadow-md p-4"
    
    return (
        <div className="pt-6 w-full flex flex-col items-center gap-7 text-lg">
            <PageTitle>
                Δημιουργία Νέου Χρήστη
            </PageTitle>
            <div className="relative w-full">
                <form onSubmit={submitForm}>
                    <div
                        className="
                            grid
                            md:grid-cols-2 md:grid-rows-3
                            sm:grid-cols-1 sm:grid-rows-6
                            gap-x-20 gap-y-5
                            rounded-lg
                            px-20 py-8
                        "
                    >
                        <div className="flex flex-col gap-1">
                            <label htmlFor="uname">Όνομα Χρήστη</label>
                            <FormInputField
                                value={uname}
                                setValue={setUname}
                                classExtra={fieldClassExtra}
                                placeholder="Όνομα Χρήστη"
                            />
                            <FormFieldHint skipHint={usernameOk} text="Απαιτείται τουλάχιστον 1 χαρακτήρας." />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <FormInputField
                                type="email"
                                value={email}
                                setValue={setEmail}
                                classExtra={fieldClassExtra}
                                placeholder="Email"
                            />
                            <FormFieldHint skipHint={emailOk} text="Απαιτείται μια έγκυρη διεύθυνση email." />
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
                            <FormFieldHint skipHint={pwdOk} text="Απαιτούνται τουλάχιστον 8 χαρακτήρες." />
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
                            <FormFieldHint skipHint={verifyPwdOk} text="Οι κωδικοί πρόσβασης δεν ταιριάζουν." />
                        </div>
                        <div className="md:col-span-2 sm:col-span-1 flex flex-col gap-1 md:items-center sm:items-start">
                            <span>Επιλογή Ρόλου</span>
                            <div className="flex flex-col gap-1 items-start">
                            {
                                Object.entries(USER_ROLES).map(([roleName, roleDesc], i) => 
                                    <div className="flex flex-row gap-2 items-center" key={i}>
                                        <input type="radio" name={roleName} checked={role === roleName} onChange={() => setRole(roleName)}/>
                                        <label htmlFor={roleName} onClick={() => setRole(roleName)}>
                                            {roleDesc}
                                        </label>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                        <div className="flex justify-center md:col-span-2 sm:col-span-1">
                            {
                                canSubmitForm ?
                                <button
                                    type="submit"
                                    className={`
                                        bg-dark-cyan
                                        hover:bg-xdark-cyan
                                        duration-150
                                        h-max
                                        px-5 py-2
                                        rounded-xl
                                        border-dark-cyan border-2
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
                                        border-dark-cyan border-2   
                                    `}
                                    disabled>
                                    Δημιουργία Χρήστη
                                </button>
                            }
                            
                        </div>
                    </div>
                </form>
                {
                    loading ?
                    <LoadingIndicator stretchParent={true}/>
                    :
                    null
                }
            </div>
        </div>
    )    
}
