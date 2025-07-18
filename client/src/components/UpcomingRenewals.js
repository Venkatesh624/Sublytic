import React, { useEffect, useState } from 'react';
import './UpcomingRenewals.css';

function UpcomingRenewals() {
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
  // Find next 3 upcoming renewals
  const upcoming = safeSubs
    .map(sub => ({ name: sub.name, date: new Date(sub.firstBillDate) }))
    .filter(sub => sub.date >= new Date())
    .sort((a, b) => a.date - b.date)
    .slice(0, 3);

  return (
    <div className="upcoming-renewals">
      <h3>Upcoming Renewals</h3>
      <ul>
        {upcoming.length === 0 ? <li>No upcoming renewals</li> : upcoming.map((r, i) => (
          <li key={i}><b>{r.name}</b>: {r.date.toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingRenewals;
