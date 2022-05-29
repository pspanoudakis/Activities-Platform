import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import { AppContext } from './AppContext';
import { AdminModal } from './components/AdminModal';
import { Navbar } from './components/Navbar';

function App() { 

  const navigate = useNavigate()
  const [appContext, setAppContext] = useState({
    navigate: navigate,
    showModal: false,
    modalContent: null
  })

  return (
    <>
      <AppContext.Provider value={{
        state: appContext,
        setState: setAppContext
      }}>
        <AdminModal
          show={appContext.showModal}
          closeCallback={() => setAppContext({
            ...appContext,
            showModal: false,
            modalContent: null
        })}>
          { appContext.modalContent }
        </AdminModal>
        <div className='w-full, flex justify-center h-full'>
          <div
            className='w-full h-max flex flex-col gap-2 items-center'
            style={{ maxWidth: "60rem", minWidth: "20rem"}}
          >
              <Navbar/>
              <Outlet/>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
