import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Insights from './pages/insights/Insights';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/home/Home';
import LandingPage from './pages/landing/LandingPage';
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
            <Routes>
                {/* Landing page is default */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Sidebar for main app pages */}
                <Route path="/home" element={<div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#f7f9fa' }}><Home showSidebar={true} /></div></div>} />
                <Route path="/dashboard" element={<div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#f7f9fa' }}><Dashboard /></div></div>} />
                <Route path="/subscriptions" element={<div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#f7f9fa' }}><SubscriptionsPage /></div></div>} />
                <Route path="/insights" element={<div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#f7f9fa' }}><InsightsPage /></div></div>} />
                <Route path="/calendar" element={<div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#f7f9fa' }}><CalendarPage /></div></div>} />
                <Route path="/whatif" element={<div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#f7f9fa' }}><WhatIfPage /></div></div>} />
                <Route path="/notifications" element={<div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#f7f9fa' }}><NotificationsPage /></div></div>} />
                <Route path="/settings" element={<div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#f7f9fa' }}><SettingsPage /></div></div>} />
            </Routes>
        </Router>
    );
}

export default App;
