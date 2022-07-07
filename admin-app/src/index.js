import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import { App } from './App';
import { Index } from './pages/Index';
import { UserSearchPage } from './pages/UserSearchPage';
import { UserPage } from './pages/UserPage';
import reportWebVitals from './reportWebVitals';
import { ActivityPage } from './pages/ActivityPage';
import { PendingActivitiesPage } from './pages/PendingActivitiesPage';
import { NewUserPage } from './pages/NewUserPage';
import { PlatformStatsPage } from './pages/PlatformStatsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Index />}/>
                    <Route path="users">
                        <Route index element={<UserSearchPage />}/>
                        <Route path=":username" element={<UserPage />}/>
                    </Route>
                    <Route path="pendingActivities">
                        <Route index element={<PendingActivitiesPage />}/>
                        <Route path=":activityId" element={<ActivityPage />}/>
                    </Route>
                    <Route path="newUser" element={<NewUserPage />}/>
                    <Route path="platformStats" element={<PlatformStatsPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
