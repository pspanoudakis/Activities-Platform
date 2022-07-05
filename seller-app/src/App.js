import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet } from "react-router-dom";
import ActionBar from './components/ActionBar.js';
import LoginPage from './components/LoginPage';
import { useState, useEffect } from 'react'
import { jwtIsStored } from './api/jwt';
import { loginWithJwt } from './api/loginAPI';

function App() {
  const [userInfo, setUserInfo] = useState(true);
  const [pendingLogin, setPendingLogin] = useState(true)

  useEffect(() => {
    if (!userInfo && jwtIsStored()) {
      //setPendingLogin(true)
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
            <Outlet/>
          </div>
        </>
        :
        <LoginPage loginCallback={setUserInfo}/>
      }
    </div>
  )
}

export default App;
