import React, { useState, useMemo, useContext } from "react";
import { signUp } from "../api/loginAPI";
import { AppContext } from "../AppContext";
import { FormFieldWithHint } from "../shared/FormUtils";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { ModalResultMessage } from "../shared/ModalResultMessage";
import { SectionTitle } from "../shared/SectionTitle";

export function SignUpForm() {
    const context = useContext(AppContext)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [verifyPwd, setVerifyPwd] = useState('')

    const [loading, setLoading] = useState(false)

    const usernameOk = useMemo(() => {
        return username.length > 0
    }, [username])

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

    const submitForm = e => {
        e.preventDefault()        
        setLoading(true)

        console.log({
            username: username,
            email: email,
            pwd: pwd
        })

        signUp(username, email, pwd, (response) => {
            if (response.ok) {
                context.setState({
                    ...context.state,
                    userInfo: response.data,
                    showModal: true,
                    modalProps: {
                        content: <ModalResultMessage success={true} text='Ο Λογαριασμός σας δημιουργήθηκε με επιτυχία!'/>
                    }
                })
            }
            else {
                context.setState({
                    ...context.state,
                    showModal: true,
                    modalProps: {
                        content: <ModalResultMessage success={false} text='Άγνωστο σφάλμα. Παρακαλούμε δοκιμάστε ξανά αργότερα.'/>
                    }
                })
            }
            console.log(response);
            setLoading(false)
        })
    }
    
    return (
        <div className="w-full h-full flex flex-col gap-8 justify-center items-center px-6 py-3 relative">
            <SectionTitle>
                Δημιουργία Λογαριασμού
            </SectionTitle>
            <form
                method="POST"
                onSubmit={submitForm}
                className="w-full flex flex-col gap-2 justify-center items-center py-3"
            >
                <div
                    className="
                        grid
                        md:grid-cols-2 md:grid-rows-3
                        sm:grid-cols-1 sm:grid-rows-6
                        gap-x-20 gap-y-5
                        rounded-lg
                    "
                >
                    <FormFieldWithHint
                        labelText="Όνομα Χρήστη"
                        labelFor="uname"
                        type="text"
                        value={username}
                        setValue={setUsername}
                        placeholder="Όνομα Χρήστη"
                        skipHint={usernameOk}
                        hintText={"Απαιτείται τουλάχιστον 1 χαρακτήρας."}
                    />
                    <FormFieldWithHint
                        labelText="Email"
                        labelFor="email"
                        type="text"
                        value={email}
                        setValue={setEmail}
                        placeholder="Email"
                        skipHint={emailOk}
                        hintText={"Απαιτείται μια έγκυρη διεύθυνση email."}
                    />
                    <FormFieldWithHint
                        labelText="Κωδικός Πρόσβασης"
                        labelFor="pwd"
                        type="password"
                        value={pwd}
                        setValue={setPwd}
                        placeholder="Κωδικός Πρόσβασης"
                        skipHint={pwdOk}
                        hintText={"Απαιτούνται τουλάχιστον 8 χαρακτήρες."}
                    />
                    <FormFieldWithHint
                        labelText="Επιβεβαίωση Κωδικού"
                        labelFor="pwd"
                        type="password"
                        value={verifyPwd}
                        setValue={setVerifyPwd}
                        placeholder="Επιβεβαίωση Κωδικού"
                        skipHint={verifyPwdOk}
                        hintText={"Οι κωδικοί πρόσβασης δεν ταιριάζουν."}
                    />
                    <div className="flex justify-center md:col-span-2 sm:col-span-1">
                        <button
                            type="submit"
                            className="
                                h-max
                                rounded-xl
                                px-4 py-2
                                text-lg
                                bg-navbar-cyan
                                hover:bg-navbar-dark-cyan
                                disabled:bg-dark-cyan
                                disabled:text-gray-500
                            "
                            disabled={!canSubmitForm}
                        >
                            Δημιουργία Λογαριασμού
                        </button>
                    </div>
                </div>
            </form>
            {
                loading ?
                <LoadingIndicator stretchParent={true} customColor="bg-cyan/75"/>
                :
                null
            }
        </div>
    )
}
