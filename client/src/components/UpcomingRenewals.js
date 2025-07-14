import React, { useEffect, useState } from 'react';
import './UpcomingRenewals.css';

function UpcomingRenewals() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => setSubs(data))
      .catch(() => setSubs([]));
  }, []);

  // Find next 3 upcoming renewals
  const upcoming = subs
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
