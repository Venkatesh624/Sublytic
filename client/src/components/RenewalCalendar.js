import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function RenewalCalendar() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => setSubscriptions(data))
      .catch(() => setSubscriptions([]));
  }, []);

  // Find subscriptions renewing on selected date
  const renewals = subscriptions.filter(sub => {
    // Accept both YYYY-MM-DD and YYYY-MM-DDTHH:mm:ss formats
    const subDate = new Date(sub.firstBillDate);
    return (
      subDate.getFullYear() === selectedDate.getFullYear() &&
      subDate.getMonth() === selectedDate.getMonth() &&
      subDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="renewal-calendar">
      <h2>Renewal Calendar</h2>
      <Calendar value={selectedDate} onChange={setSelectedDate} />
      <div style={{ marginTop: '1rem' }}>
        <h3>Renewals on {selectedDate.toLocaleDateString()}:</h3>
        {renewals.length === 0 ? (
          <p>No renewals on this date.</p>
        ) : (
          <ul>
            {renewals.map(sub => (
              <li key={sub.id}><strong>{sub.name}</strong> ({sub.category}) - ${sub.cost}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RenewalCalendar;
