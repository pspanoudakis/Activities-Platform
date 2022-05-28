import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import App from './App';
import { Index } from './pages/Index';
import { UserSearch } from './pages/UserSearch';
import { UserPage } from './pages/UserPage';
import reportWebVitals from './reportWebVitals';
import { PlatformStats } from './pages/PlatformStats';
import { Logout } from './pages/Logout';
import { ActivityPage } from './pages/ActivityPage';
import { PendingActivities } from './pages/PendingActivities';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Index />}/>
                    <Route path="users">
                        <Route index element={<UserSearch />}/>
                        <Route path=":userId" element={<UserPage />}/>
                    </Route>
                    <Route path="pendingActivities">
                        <Route index element={<PendingActivities />}/>
                        <Route path=":activityId" element={<ActivityPage />}/>
                    </Route>
                    {/*<Route path="newUser" element={<NewUser />}/>*/}
                    <Route path="platformStats" element={<PlatformStats />}/>
                    <Route path="logout" element={<Logout />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
