import React, { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { FormInputField } from "../shared/FormUtils";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { RESPONSE_STATUS } from "../api/fetchAPI";
import { loginWithCredentials } from "../api/loginAPI";


export default function LoginPage({loginCallback, goToForm}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState('')

  const canLogin = useMemo(() => username.length > 0 && password.length > 0, [username, password])

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
    <div className="w-96 h-full mb-96 bg-hover rounded-3xl mx-auto mt-20 flex flex-col gap-8 justify-center items-center p-6 relative">
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
              placeholder="Όνομα Χρήστη"
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
              placeholder="Κωδικός"
            />
          </div>
          <button
            type="submit"
            className="
              rounded-xl
              mt-5
              px-6 py-1
              text-lg
              bg-cyan
              hover:bg-blue-200
            "
            disabled={!canLogin}
          >
              Σύνδεση
          </button>
        </form>
        <div>
          Δεν έχετε λογαριασμό;
          <button onClick={() => goToForm()} className='text-blue-500 ml-1'>Εγγραφείτε τώρα</button>
        </div>
        {
          loading ?
          <LoadingIndicator stretchParent={true} customColor="bg-black opacity-50 rounded-3xl"/>
          :
          null
        }
    </div>
  );
}
