
import React, { useState } from 'react';

function NotificationsPage() {
  const [rules, setRules] = useState([
    { id: 1, label: 'Notify me 3 days before a renewal', enabled: true },
    { id: 2, label: 'Notify me when a subscription is added/removed', enabled: false },
    { id: 3, label: 'Notify me if a subscription cost increases', enabled: false },
  ]);

  const toggleRule = (id) => {
    setRules(rules => rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="notifications-page">
      <h1>Notifications & Alerts</h1>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: 500 }}>
        {rules.map(rule => (
          <li key={rule.id} style={{ marginBottom: 16 }}>
            <label>
              <input type="checkbox" checked={rule.enabled} onChange={() => toggleRule(rule.id)} />
              &nbsp;{rule.label}
            </label>
          </li>
        ))}
      </ul>
      <p style={{ color: '#888' }}><em>(Demo: Notification rules are not persisted.)</em></p>
    </div>
  );
}

export default NotificationsPage;
