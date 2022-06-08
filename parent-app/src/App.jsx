import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import { AppContext } from './AppContext';
import { Modal } from './shared/Modal';
import { Navbar } from './components/Navbar';

function App() { 

  const navigate = useNavigate()
  const [appContext, setAppContext] = useState({
    navigate: navigate,
    userInfo: {
      username: 'parentUser',
      userId: 16,
      balance: 126
    },
    //userInfo: null,
    showModal: false,
    modalContent: null
  })

  return (
    <>
      <AppContext.Provider value={{
        state: appContext,
        setState: setAppContext
      }}>
        <Modal
          show={appContext.showModal}
          closeCallback={() => setAppContext({
            ...appContext,
            showModal: false,
            modalContent: null
        })}>
          { appContext.modalContent }
        </Modal>
        <div className='w-full, flex justify-center h-full'>
          <div
            className='w-full h-max flex flex-col gap-2 items-center'
          >
              <Navbar/>
              <div style={{ maxWidth: "60rem", minWidth: "20rem"}} className='w-full h-max flex flex-col gap-2 items-center'>
                <Outlet/>
              </div>
              {/* <Footer/> */}
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
