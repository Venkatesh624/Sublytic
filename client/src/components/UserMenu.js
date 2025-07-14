import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserMenu.css';

function UserMenu({ username }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear username from localStorage
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="user-menu-container">
      <div className="user-avatar" onClick={() => setOpen(!open)}>
        {username ? username[0].toUpperCase() : '?'}
      </div>
      {open && (
        <div className="user-dropdown">
          <div className="user-name">{username || 'Unknown User'}</div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
