import React, { useState, useMemo } from "react";
import { signUp } from "../api/loginAPI";
import { FormFieldWithHint } from "../shared/FormUtils";
import { LoadingIndicator } from "../shared/LoadingIndicator";


export default function RegisterPage({registerCallback, goToForm}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPwd, setVerifyPwd] = useState('')
  const [loading, setLoading] = useState(false)

  const usernameOk = useMemo(() => {
    return username.length > 0
  }, [username])

  const emailOk = useMemo(() => {
    return email.length > 0
  }, [email])

  const pwdOk = useMemo(() => {
    return password.length >= 8
  }, [password])

  const verifyPwdOk = useMemo(() => {
    return password === verifyPwd
  }, [password, verifyPwd])

  const canSubmitForm = useMemo(() => {
    return (usernameOk && emailOk && pwdOk && verifyPwdOk)
  }, [usernameOk, emailOk, pwdOk, verifyPwdOk])

  const submitForm = e => {
    e.preventDefault()        
    setLoading(true)

    console.log({
      username: username,
      email: email,
      password: password
    })

    signUp(username, email, password, (response) => {
      if (response.ok) {
        registerCallback(response.data)
        /*showModal: true,
        modalProps: {
          content: <ModalResultMessage success={true} text='Ο Λογαριασμός σας δημιουργήθηκε με επιτυχία!'/>
        })*/
      }
      else {

        /*context.setState({
          ...context.state,
          showModal: true,
          modalProps: {
              content: <ModalResultMessage success={false} text='Άγνωστο σφάλμα. Παρακαλούμε δοκιμάστε ξανά αργότερα.'/>
          }
        })*/
      }
      setLoading(false)
    })
  }

  return (
    <div className="w-8/12 max-w-3xl mb-96 bg-hover rounded-3xl mx-auto mt-20 flex flex-col gap-8 justify-center items-center p-6 relative">
      <div className='text-xl'>Εγγραφή</div>
      <form
        method="POST"
        onSubmit={submitForm}
        className="flex flex-col gap-2 justify-center items-center py-3"
      >
        <div
          className="
              grid
              md:grid-cols-2 md:grid-rows-3
              sm:grid-cols-1 sm:grid-rows-6
              gap-x-8 gap-y-5
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
            value={password}
            setValue={setPassword}
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
                h-12
                rounded-xl
                px-4 py-2
                text-lg
                bg-cyan
                hover:bg-blue-200
                disabled:opacity-70
              "
              disabled={!canSubmitForm}
            >
              Δημιουργία Λογαριασμού
            </button>
          </div>
        </div>
        <div>
          Έχετε ήδη λογαριασμό;
          <button onClick={() => goToForm()} className='text-blue-500 ml-1'>Συνδεθείτε τώρα</button>
        </div>
      </form>
      {
        loading ?
        <LoadingIndicator stretchParent={true} customColor="bg-cyan opacity-70 rounded-3xl"/>
        :
        null
      }
    </div>
  );
}
