import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Insights from './pages/insights/Insights';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/home/Home';
import Sidebar from './components/Sidebar';
import SubscriptionsPage from './pages/subscriptions/SubscriptionsPage';
import InsightsPage from './pages/insights/InsightsPage';
import CalendarPage from './pages/calendar/CalendarPage';
import WhatIfPage from './pages/whatif/WhatIfPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import SettingsPage from './pages/settings/SettingsPage';
import './App.css';

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#f7f9fa' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/subscriptions" element={<SubscriptionsPage />} />
                        <Route path="/insights" element={<InsightsPage />} />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route path="/whatif" element={<WhatIfPage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
