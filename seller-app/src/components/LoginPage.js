import React, { useState } from "react";
import { FormInputField } from "../shared/FormUtils";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { RESPONSE_STATUS } from "../api/fetchAPI";
import { loginWithCredentials } from "../api/loginAPI";


export default function LoginPage({
  loginCallback
}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState('')

  function submitForm(e) {
    e.preventDefault()
    setLoading(true)
    loginWithCredentials(username, password, (response) => {
      if (response.ok) {
        loginCallback(response.data)
      }
      else {
          let msg = 'Άγνωστο σφάλμα σύνδεσης. Παρακαλούμε δοκιμάστε ξανά αργότερα.'
          if (response.status === RESPONSE_STATUS.BAD_REQUEST) {
              msg = "Το Όνομα χρήστη ή ο Κωδικός Πρόσβασης είναι λάθος."
          }
      }
      console.log(response);
      setLoading(false)
    })
  }

  return (
    <div className="w-96 bg-hover rounded-3xl mx-auto mt-20 mb-80 flex flex-col gap-8 justify-center items-center px-6 py-3 relative">
        <div className='text-xl'>Σύνδεση</div>
        <form
            method="POST"
            onSubmit={submitForm}
            className="w-max flex flex-col flex-wrap gap-2 justify-center items-center py-3"
        >
            <div className="flex flex-col gap-1">
                <FormInputField
                    labelFor="uname"
                    labelText="Όνομα Χρήστη"
                    classExtra="w-max"
                    type="text"
                    value={username}
                    setValue={setUsername}
                    placeholder=""
                />
            </div>
            <div className="flex flex-col gap-1">
                <FormInputField
                    labelFor="pwd"
                    labelText="Κωδικός Πρόσβασης"
                    classExtra="w-max"
                    type="password"
                    value={password}
                    setValue={setPassword}
                    placeholder=""
                />
            </div>
            <button
                type="submit"
                className="
                    rounded-xl
                    mt-5
                    px-6 py-1
                    text-lg
                    bg-background
                    hover:bg-white
                "
            >
                Σύνδεση
            </button>
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
