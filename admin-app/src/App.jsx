import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { jwtIsStored } from './api/jwt';
import { loginWithJwt } from './api/loginAPI';

import { AppContext } from './AppContext';
import { LoadingIndicator } from './shared/LoadingIndicator';
import { Modal } from './components/Modal';
import { Navbar } from './components/Navbar';
import { SignInForm } from './components/SignInForm';

export function App() {

    const [pendingLogin, setPendingLogin] = useState(true)

    const [appContext, setAppContext] = useState({
        showModal: false,
        user: null,
        modalContent: null
    })

    useEffect(() => {
        // Attempt to login with jwt
        if (!appContext.user && jwtIsStored()) {
            loginWithJwt((response) => {
                console.log(response)
                if (response.ok) {
                    setAppContext({
                        ...appContext,
                        user: response.data
                    })
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
    }, [appContext])

    return (
    <>
        <AppContext.Provider
            value={{
            state: appContext,
            setState: setAppContext
            }}
        >
            <Modal
                show={appContext.showModal}
                closeCallback={() => setAppContext({
                    ...appContext,
                    showModal: false,
                    modalContent: null
                })}
            >
                { appContext.modalContent }
            </Modal>
            <div className='w-full, flex justify-center min-h-screen'>
                <div
                    className='w-full h-full flex flex-col gap-2 justify-start items-center'
                    style={{ maxWidth: "70rem", minWidth: "20rem"}}
                >
                {
                    pendingLogin ?
                    <LoadingIndicator/>
                    : (
                        appContext.user ?
                        <>
                        <Navbar/>
                        <Outlet/>
                        </>
                        :
                        <div className='flex justify-center items-center pt-10'>
                            <SignInForm/>
                        </div>
                    )
                }
                </div>
            </div>
        </AppContext.Provider>
    </>
    );
}
