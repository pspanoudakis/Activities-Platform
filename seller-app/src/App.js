import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import ActionBar from './components/ActionBar.js';
import ActivityPage from './components/ActivityPage.js';
import ActivitiesPage from './components/ActivitiesPage.js';
import FacilitiesPage from './components/FacilitiesPage.js';
import FacilityPage from './components/FacilityPage.js';
import ProfilePage from './components/ProfilePage';
import AddActivityPage from './components/AddActivityPage.js';
import StatisticsPage from "./components/StatisticsPage";
import HomePage from "./components/HomePage";
import AddFacilityPage from "./components/AddFacilityPage.js"

function App() {
  return (
    <React.StrictMode>
      <div className='flex text-gray-700'>
        <BrowserRouter>
          <ActionBar/>
          <div className='mx-auto p-10 w-9/12 max-w-4xl'>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path="/activities" element={<ActivitiesPage/>}/>
            <Route path="/activity" element={<ActivityPage/>}/>
            <Route path="/facilities" element={<FacilitiesPage/>}/>
            <Route path="/facility" element={<FacilityPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/add-activity" element={<AddActivityPage/>}/>
            <Route path="/add-facility" element={<AddFacilityPage/>}/>
            <Route path="/statistics" element={<StatisticsPage/>}/>
          </Routes>
          </div>
        </BrowserRouter>
      </div>
    </React.StrictMode>
  )
}

export default App;
