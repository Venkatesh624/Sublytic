import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaList, FaChartPie, FaCalendarAlt, FaLightbulb, FaBell, FaCog } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">SubTracker AI</div>
      <ul>
        <li><NavLink to="/" end><FaHome /> Dashboard</NavLink></li>
        <li><NavLink to="/subscriptions"><FaList /> Subscriptions</NavLink></li>
        <li><NavLink to="/insights"><FaChartPie /> Insights</NavLink></li>
        <li><NavLink to="/calendar"><FaCalendarAlt /> Calendar</NavLink></li>
        <li><NavLink to="/whatif"><FaLightbulb /> What-If</NavLink></li>
        <li><NavLink to="/notifications"><FaBell /> Notifications</NavLink></li>
        <li><NavLink to="/settings"><FaCog /> Settings</NavLink></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
