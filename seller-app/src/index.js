import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './components/HomePage';
import './App.css';
import ActionBar from './components/ActionBar.js';
import ActivityPage from './components/ActivityPage.js';
import ActivitiesPage from './components/ActivitiesPage.js';
import FacilitiesPage from './components/FacilitiesPage.js';
import ProfilePage from './components/ProfilePage';
import AddActivityPage from './components/AddActivityPage.js';
import AddFacilityPage from "./components/AddFacilityPage.js"
import LoginPage from "./components/LoginPage.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/activities" element={<ActivitiesPage/>}/>
          <Route path="/activity" element={<ActivityPage/>}/>
          <Route path="/facilities" element={<FacilitiesPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/add-activity" element={<AddActivityPage/>}/>
          <Route path="/add-facility" element={<AddFacilityPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
