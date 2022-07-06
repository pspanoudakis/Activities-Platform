import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { changeUserPassword, fetchUser } from '../api/usersAPI'
import { FormFieldHint, FormInputField } from '../shared/FormUtils'
import { LoadingIndicator } from '../shared/LoadingIndicator'
import { ModalResultMessage } from '../shared/ModalResultMessage'
import { SectionTitle } from '../shared/SectionTitle'
import { AppContext } from '../AppContext'

export function UserPage() {

    const context = useContext(AppContext)
    const params = useParams()

    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    const [pwd, setPwd] = useState('')
    const [verifyPwd, setVerifyPwd] = useState('')

    const pwdOk = useMemo(() => {
        return pwd.length >= 8
    }, [pwd])

    const verifyPwdOk = useMemo(() => {
        return pwd === verifyPwd
    }, [pwd, verifyPwd])

    const canSubmitForm = useMemo(() => {
        return (pwdOk && verifyPwdOk)
    }, [pwdOk, verifyPwdOk])

    useEffect(() => {
        if (params.username) {
            fetchUser(params.username, (response) => {
                console.log(response)
                if (response.ok) {
                    setUserInfo(response.data)
                }
                setLoading(false)
            })
        }
        else {
            setUserInfo(null)
            setLoading(false)
        }
    }, [params])

    const submitForm = e => {
        e.preventDefault()        
        setLoading(true)

        console.log(pwd)

        changeUserPassword(userInfo.username, pwd, response => {
            context.setState({
                ...context.state,
                showModal: true,
                modalContent: <ModalResultMessage
                                success={response.ok}
                                text={`${
                                    response.ok ?
                                    `Ο κωδικός πρόσβασης του χρήστη '${userInfo.username}' άλλαξε επιτυχώς.`
                                    : `Σφάλμα αλλαγής κωδικού πρόσβασης.`
                                }`}
                            /> 
            })
            setPwd('')
            setVerifyPwd('')
            setLoading(false)
        })

    }

    return (
        <div>
        {
            loading ?
            <LoadingIndicator/>
            :
            <div className='pt-6 flex flex-col gap-5'>
                <SectionTitle>
                {`Διαχείριση χρήστη '${userInfo.username}'`}
                </SectionTitle>
            {
                userInfo ?
                <form onSubmit={submitForm} className='flex flex-col gap-3'>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="pwd">Νέος Κωδικός Πρόσβασης</label>
                        <FormInputField
                            type="password"
                            value={pwd}
                            setValue={setPwd}
                            classExtra="shadow-md p-4"
                            placeholder="Κωδικός"
                        />
                        <FormFieldHint skipHint={pwdOk} text="Απαιτούνται τουλάχιστον 8 χαρακτήρες." />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="verifyPwd">Επιβεβαίωση Νέου Κωδικού</label>
                        <FormInputField
                            type="password"
                            value={verifyPwd}
                            setValue={setVerifyPwd}
                            classExtra="shadow-md p-4"
                            placeholder="Επιβεβαίωση Κωδικού"
                        />
                        <FormFieldHint skipHint={verifyPwdOk} text="Οι κωδικοί πρόσβασης δεν ταιριάζουν." />
                    </div>
                    <button
                        disabled={!canSubmitForm}
                        type="submit"
                        className={`
                            bg-dark-cyan hover:bg-xdark-cyan
                            disabled:text-gray-500  disabled:bg-gray-200 disabled:hover:bg-gray-200
                            duration-150
                            h-max
                            px-5 py-2
                            rounded-xl
                            border-dark-cyan border-2
                        `}>
                        Αποθήκευση Κωδικού
                    </button>
                </form>
                :
                <span className='py-10 text-center text-lg font-light'>
                    {`Ο χρήστης '${params.username}' δεν βρέθηκε.`}
                </span>
            }
            </div>
        }
        </div>
    )
}
