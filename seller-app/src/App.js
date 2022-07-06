import React from 'react'
import { Outlet } from "react-router-dom";
import ActionBar from './components/ActionBar.js';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage.js';
import { useState, useEffect } from 'react'
import { jwtIsStored } from './api/jwt';
import { loginWithJwt } from './api/loginAPI';
import { LoadingIndicator } from './shared/LoadingIndicator';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [pendingLogin, setPendingLogin] = useState(true)
  const [form, setForm] = useState(0)

  useEffect(() => {
    if (!userInfo && jwtIsStored()) {
      loginWithJwt((response) => {
        console.log(response)
        if (response.ok) {
          setUserInfo(response.data)
        }
        else {
          console.log('jwt expired or not found')
        }
        setPendingLogin(false)
      })
    }
    else {
      setPendingLogin(false)
    }
  }, [userInfo])

  return (
    <div className='flex text-gray-700'>
      {
        userInfo ?
        <>
          <ActionBar/>
          <div className='mx-auto p-10 w-9/12 max-w-4xl'>
            {
              pendingLogin ?
              <LoadingIndicator stretchParent={false}/>
              :
              <Outlet/>
            }
          </div>
        </>
        :
        <>
          {
            form === 0 ?
            <LoginPage loginCallback={setUserInfo} goToForm={() => setForm(1)}/>
            :
            <RegisterPage registerCallback={setUserInfo} goToForm={() => setForm(0)}/>
          }
        </>
      }
    </div>
  )
}

export default App;
