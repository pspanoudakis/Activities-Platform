import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import { AppContext } from './AppContext';
import { Navbar } from './components/Navbar';

function App() { 

  const navigate = useNavigate()
  const [appContext, setAppContext] = useState({
    navigate: navigate
  })

  return (
    <div style={
      {
        width: "100%",
        display: "flex",
        justifyContent: "center"
      }
    }>
      <div style={
        {
          width: "100%",
          maxWidth: "55rem",
          minWidth: "20rem"
        }
      }>
        <AppContext.Provider value={{
          state: appContext,
          setState: setAppContext
        }}>
          <Navbar/>
          <Outlet/>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
