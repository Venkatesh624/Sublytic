import React, { useEffect, useState } from 'react';
import './RecentActivity.css';

function RecentActivity() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('/api/subscriptions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setSubs(data))
      .catch(() => setSubs([]));
  }, []);

  // Defensive: ensure subs is always an array
  const safeSubs = Array.isArray(subs) ? subs : [];
  // Generate recent activity from subscription changes
  const activities = safeSubs.slice(-4).reverse().map(sub => `Added or updated ${sub.name} subscription`);

  return (
    <div className="recent-activity">
      <h3>Recent Activity</h3>
      <ul>
        {activities.length === 0 ? <li>No recent activity</li> : activities.map((act, i) => (
          <li key={i}>{act}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivity;
