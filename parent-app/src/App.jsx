import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

import { AppContext } from './AppContext';
import { Modal } from './shared/Modal';
import { Navbar } from './components/Navbar';
import { useEffect } from 'react';
import { jwtIsStored } from './api/jwt';
import { LoadingIndicator } from './shared/LoadingIndicator';
import { Footer } from './shared/Footer';
import { loginWithJwt } from './api/loginAPI';

function App() {
    const [pendingLogin, setPendingLogin] = useState(true)
    const [appContext, setAppContext] = useState({
        /* userInfo: {
            username: 'parentUser',
            userId: 16,
            balance: 126
        }, */
        userInfo: null,
        showModal: false,
        modalProps: {
            content: null,
            scroll: false,
            bgColor: 'white'
        }
    })

    useEffect(() => {
        // Attempt to login with jwt
        if (!appContext.userInfo && jwtIsStored()) {
            //setPendingLogin(true)
            loginWithJwt((response) => {
                console.log(response)
                if (response.ok) {
                    setAppContext({
                        ...appContext,
                        userInfo: response.data
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
        <AppContext.Provider value={{
                state: appContext,
                setState: setAppContext
            }}
        >
            <Modal
                color={appContext.modalProps.bgColor}
                show={appContext.showModal}
                overflowScroll={appContext.modalProps.scroll}
                closeCallback={() => setAppContext({
                    ...appContext,
                    showModal: false,
                    modalProps: {
                        content: null,
                        scroll: false,
                        bgColor: 'white'
                    }
                })}
            >
                { appContext.modalProps.content }
            </Modal>
            <div className='w-full, flex justify-center min-h-screen'>
                <div
                    className='flex-1 flex flex-col gap-2 items-center justify-between'
                >
                    <Navbar/>
                    {/* Test maxWidth */}
                    <div style={{ maxWidth: "70rem", minWidth: "20rem"}} className='w-full h-full flex flex-col gap-2 items-center justify-start'>
                    {
                        pendingLogin ?
                        <LoadingIndicator stretchParent={false}/>
                        :
                        <Outlet/>
                    }
                    </div>
                    <Footer/>
                </div>
            </div>
        </AppContext.Provider>
    </>
    );
}

export default App;
