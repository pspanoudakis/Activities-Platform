import React, { useState, useMemo, useContext } from "react";
import { loginWithCredentials, RESPONSE_STATUS } from "../api/fetchAPI";
import { AppContext } from "../AppContext";
import { FormInputField } from "../shared/FormUtils";
import { SectionTitle } from "../shared/SectionTitle";
import { ModalResultMessage } from '../shared/ModalResultMessage'
import { LoadingIndicator } from "../shared/LoadingIndicator";

export function SignInForm() {
    const context = useContext(AppContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const canLogin = useMemo(() => username.length > 0 && password.length > 0, [username, password])

    function submitForm(e) {
        e.preventDefault()
        setLoading(true)
        loginWithCredentials(username, password, (response) => {
            if (response.ok) {
                context.setState({
                    ...context.state,
                    userInfo: response.data,

                    // Should we display a "Connection Successful" msg?
                    showModal: false,
                    modalProps: {
                        content: null
                    }
                })
            }
            else {
                let msg = 'Άγνωστο σφάλμα σύνδεσης. Παρακαλούμε δοκιμάστε ξανά αργότερα.'
                if (response.status === RESPONSE_STATUS.BAD_REQUEST) {
                    msg = "Το Όνομα χρήστη ή ο Κωδικός Πρόσβασης είναι λάθος."
                }
                context.setState({
                    ...context.state,
                    showModal: true,
                    modalProps: {
                        content: <ModalResultMessage success={false} text={msg}/>
                    }
                })
            }
            console.log(response);
            setLoading(false)
        })
    }
    
    return (
        <div className="w-full flex flex-col gap-12 justify-center items-center px-6 py-3 relative">
            <SectionTitle>
                Σύνδεση
            </SectionTitle>
            <form
                method="POST"
                onSubmit={submitForm}
                className="w-full flex flex-col gap-2 justify-center items-center py-3"
            >
                <div className="flex flex-col gap-1">
                    <FormInputField
                        labelFor="uname"
                        labelText="Όνομα Χρήστη"
                        classExtra="w-max"
                        type="text"
                        value={username}
                        setValue={setUsername}
                        placeholder="Όνομα Χρήστη"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <FormInputField
                        labelFor="pwd"
                        labelText="Κωδικός"
                        classExtra="w-max"
                        type="password"
                        value={password}
                        setValue={setPassword}
                        placeholder="Κωδικός"
                    />
                </div>
                <button
                    type="submit"
                    className="
                        rounded-xl
                        px-3 py-1
                        text-lg
                        bg-navbar-cyan
                        hover:bg-navbar-dark-cyan
                        disabled:bg-dark-cyan
                        disabled:text-gray-500
                    "
                    disabled={!canLogin}
                >
                    Σύνδεση
                </button>
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
